/*
 * 通用请求方法
 * @Author: JohnSon
 * @since: 2018-12-03 16:00:23
 */
import _ from 'lodash';
import Vue from 'Vue';
import config from '@/config';
// 引入 fly
var Fly = require('flyio/dist/npm/wx');
var fly = new Fly();

// 配置请求基地址

fly.config = {
    // 定义公共headers
    headers: {
        'Content-Type': 'application/json'
    },
    // 设置超时
    timeout: 20000,
    // 设置请求基地址
    baseURL: config.host,
    // 设置公共的Get参数
    params: {
        'token': '123456'
    }
};

// 拦截器
// Fly支持请求／响应拦截器，可以通过它在请求发起之前和收到响应数据之后做一些预处理。
// 添加请求拦截器
fly.interceptors.request.use((request) => {
    // 给所有请求添加自定义header
    request.headers[ 'X-Tag' ] = 'flyio';
    // 打印出请求体
    // console.log(request.body)
    // 终止请求
    // var err=new Error("xxx")
    // err.request=request
    // return Promise.reject(new Error(""))

    // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
});

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(function (response) {
    // 只将请求结果的data字段返回
    const params = response.config.origin;
    // 处理非通用数据格式
    if (!_.isPlainObject(response.data) || !_.has(response.data, 'code')) {
        return {
            code: 200,
            data: response.data,
            params
        };
    }
    response.data.params = params;
    if (response.data.code === 200 || response.data.code === 1 || response.data.code === 100) {
        // console.info(response.config.url, response.data)
        return response.data;
    } else {
        // 业务错误
        // console.error(response.config.url, response.data.errMsg);
        return Promise.reject(response.data);
    }
}, function (error) {
// 发生网络错误后会走到这里
// Http错误
    let response = error instanceof Error ? error.response || error : error;
    let result;

    if (response.data) {
        result = response.data;
    } else {
        result = {
            code: response.status || -1,
            msg: response.statusText || '网络异常，请求超时。请稍后再试'
        };
    }
    result.params = response.config.origin;
    return Promise.reject(result);
});

Vue.prototype.$http = fly; // 将fly实例挂在vue原型上

export default fly;

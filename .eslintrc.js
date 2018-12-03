// http://eslint.org/docs/user-guide/configuring

module.exports = {
    "root": true,
    "parser": 'babel-eslint',
    "parserOptions": {
        "sourceType": 'module'
    },
    "env": {
        "browser": false,
        "node": true,
        "es6": true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "extends": 'standard',
    // required to lint *.vue files
    "plugins": [
        'html'
    ],
    "settings": {
        "import/ignore": [
            "node_modules"
        ]
    },
    // add your custom rules here
    /**
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    'rules': {
        "indent": [
            "warn",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "quotes": [ 1, "single" ],
        "no-extra-semi": 1,
        "semi": [ 1, "always" ],
        "no-console": 1,
        "strict": 2,
        "no-case-declarations": 0,
        "no-undef": 2,
        "no-unused-vars": 1,
        // 函数参数不能重复
        "no-dupe-args": 1,
        // 在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-keys": 1,
        "no-class-assign": 0,
        "no-eval": 1,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
    "globals": {
        "App": true,
        "Page": true,
        "wx": true,
        "getApp": true,
        "getPage": true,
        "requirePlugin": true
    }
}
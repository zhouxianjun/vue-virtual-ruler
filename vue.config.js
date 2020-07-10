module.exports = {
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals({
                'element-resize-detector': {
                    commonjs: 'element-resize-detector',//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
                    commonjs2: 'element-resize-detector',//同上
                    amd: 'element-resize-detector',//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
                    root: 'elementResizeDetectorMaker' // 这个为lodash暴露的变量
                },
                'lodash.pickby': {
                    commonjs: 'lodash.pickby',//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
                    commonjs2: 'lodash.pickby',//同上
                    amd: 'lodash.pickby',//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
                    root: '_.pickBy' // 这个为lodash暴露的变量
                },
                'vue-render-slot': {
                    commonjs: 'vue-render-slot',//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
                    commonjs2: 'vue-render-slot',//同上
                    amd: 'vue-render-slot',//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
                    root: 'vue-render-slot' // 这个为lodash暴露的变量
                },
                'vue-virtual-scroller': {
                    commonjs: 'vue-virtual-scroller',//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
                    commonjs2: 'vue-virtual-scroller',//同上
                    amd: 'vue-virtual-scroller',//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
                    root: 'vue-virtual-scroller' // 这个为lodash暴露的变量
                }
            });
        }
    }
};

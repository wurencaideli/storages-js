/*jshint esversion: 6 */
const TerserPlugin = require('terser-webpack-plugin'); // 引入压缩插件

module.exports = {
    mode: 'none', // 因为默认是production 默认会进行压缩
    entry: {
        "storages-js": "./index.js",
        "storages-js.min": "./index.js",
    },
    output: {
        filename: "[name].js",
        library: "storages-js",
        libraryTarget: "umd",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 使用压缩插件
                include: /\.min\.js$/,
            }),
        ],
    },
};
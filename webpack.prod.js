const webpack = require('webpack'),
    merge = require('webpack-merge'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    common = require('./webpack.common.js');

const config = common.config;

module.exports = merge(config, {
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});
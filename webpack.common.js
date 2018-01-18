const path = require('path'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const baseDir = 'src';
const PATH = {
    app: path.join(__dirname, baseDir),
    template: path.join(__dirname, baseDir, 'templates', 'index.html'),
    build: path.join(__dirname, 'build')
};

const DEBUG = JSON.parse(process.env.DEBUG || 'false');
const devFlagPlugin = new webpack.DefinePlugin({
    DEBUG: JSON.stringify(DEBUG)
});

const config = {
    entry: {
        app: PATH.app
    },
    output: {
        path: PATH.build,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
            {
                loader: 'style-loader',
            }, 
            {
                loader: 'css-loader',
                options: {
                    minimize: !DEBUG,
                    sourceMap: DEBUG
                }
            }]
        },
        {
            test: /\.jsx?$/,
            include: PATH.app,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: '[name].[ext]',
                    outputPath: PATH.font,
                }
            }]
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: PATH.font
                }
            }]
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([PATH.build]),
        new HtmlWebpackPlugin({
            template: PATH.template,
            minify: DEBUG ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: false,
                removeComments: true,
                removeEmptyAttributes: true,
              }
        }),
        devFlagPlugin
    ]
};

module.exports = {
    config,
    path: PATH
};
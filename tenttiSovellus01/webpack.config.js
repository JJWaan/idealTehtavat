const path = require('path');
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    entry: resolveAppPath('source'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    mode: "development",

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true,
        port: 8000,
        host: 'localhost',
        compress: true,
        historyApiFallback: true,
    },

    target: 'web',
    devtool: 'inline-source-map',

    plugins: [
        new HTMLWebpackPlugin({
            template: './source/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: resolveAppPath('source'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
}
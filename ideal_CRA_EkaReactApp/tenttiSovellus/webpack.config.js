const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

// App directory
const appDirectory = fs.realpathSync(process.cwd());
// (cwd = current working dir)

// Saa fileen absolute pathin tässä app directoryssa
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    entry: resolveAppPath('src'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        open: true,
        hot: true,
        port: 8000,
        host: 'localhost',
        compress: true,
        historyApiFallback: true,
    },
    
    mode: "development",
    target: 'web',
    devtool: 'inline-source-map',

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: resolveAppPath('src'),
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
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

// Para evitar poner path continuamente cargamos el dirname
var path = require('path');
var basePath = __dirname;

module.exports = {
    context: path.join(basePath, 'src'), // Hacemos que el path empiece en /src
    resolve: {
        extensions: ['.js', '.ts'] // Con esto no necesitarás que poner las extensiones de ts o js
    },
    devtool: 'inline-source-map',
    entry: {
        app: './Home.ts',
        appStyles: ['./home.scss'],
        vendor: [
            '@babel/polyfill',
        ]
    },
    output: {
        filename: '[name].[chunkhash].bundle.js',
    },
    devServer: {
        port: 8081,

    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                options: {
                    useBabel: true,
                    "babelCore": "@babel/core", //Necesita babel 7
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // Procesar ES6 o superior

            },
            {
                test: /\.css$/, //Procesar css para integrarlo
                use: [
                    {loader: 'css-loader',}
                ]

            },
            {
                test: /\.scss$/, // Procesar SASS, necesario node-sass también
                use: [ // El orden es inverso 1. sass, 2.css
                    "css-loader",
                    "sass-loader",
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // Permite crear el html directamente
            filename: 'index.html', // Está en ./dist
            template: 'index.html', // Está en ./
        }),
    ]
};

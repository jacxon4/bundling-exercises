const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Para evitar poner path continuamente cargamos el dirname
const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'), // Hacemos que el path empiece en /src
    resolve: {
        extensions: ['.js', '.ts','.tsx',] // Con esto no necesitarás que poner las extensiones de ts o js
    },
    devtool: 'inline-source-map',
    entry: {
        app: './index.tsx',
        appStyles: ['./index.scss'],
        vendor: [
            '@babel/polyfill',
            'react',
            'react-dom',
        ]
    },
    output: {
        filename: '[name].[hash].bundle.js',
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
                test: /\.(jpeg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=5000', // Procesar imagenes usar url-loader para meterlo en el bundle /file-loader si lo queremos como imagen directa

            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // Procesar ES6 o superior

            },
            {
                test: /\.scss$/, // Procesar SASS, necesario node-sass también
                use: [ // El orden es inverso 1. sass, 2.css
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({ // Separar los ficheros de css en bloques
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ]
};

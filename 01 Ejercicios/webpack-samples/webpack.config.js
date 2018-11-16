var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        app: './students.ts', // Mi entrada principal
        appStyles: ['./mystyles.scss',], // Mis estilos principales
        vendor: [
            '@babel/polyfill', // inyecta los polyfills primero
            'jquery', // Añadir la lista de cualquier  vendor
        ],
        vendorStyles: [
            '../node_modules/bootstrap/dist/css/bootstrap.css', // Estilos de bootstrap como vendor
        ]
    },
    output: {
        filename: '[name].[chunkhash].bundle.js', // haciendo esto los bundles están por cada entry
        // Sino lo cachea el navegador, no cambia el hash si es el mismo file
    },
    // Todo este bloque es para minimizar el tamaño de los ficheros para que los separe de forma eficiente
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true,
                }
            }
        }
    },
    //////////////////////////////////////////
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
                    { loader: MiniCssExtractPlugin.loader, },
                    { loader: 'css-loader', }
                ]

            },
            {
                test: /\.scss$/, // Procesar SASS, necesario node-sass también
                use: [ // El orden es inverso 1. sass, 2.css, 3.Mini
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=2000', // Procesar imagenes usar url-loader para meterlo en el bundle /file-loader si lo queremos como imagen directa

            },
            {
                test: /\.html$/,
                loader: 'html-loader', // Procesar html para que pueda importar imagenes (aplica para el build)

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // Permite crear el html directamente
            filename: 'index.html', // Está en ./dist
            template: 'index.html', // Está en ./
        }),
        new webpack.ProvidePlugin({ // Inyectar una librería en global como jquery
            $: "jquery",
            jQuery: "jquery",
        }),
        new MiniCssExtractPlugin({ // Separar los ficheros de css en bloques
            filename: "[name].css",
            chunkFilename: "[id].css",
        })
    ]

}
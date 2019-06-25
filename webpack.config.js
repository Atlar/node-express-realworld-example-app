//webpack.config.js
//This file is needed to bundle React render script with React and node libraries and send it to the user browser in one bundle.js file
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './public/react_frontend/src/index.js',
    output: {
        path: path.join(__dirname, '/public/react_frontend/src/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    watch: true,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new Dotenv(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000,
      },
};
const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: path.join(__dirname, '/designer.js'),
    output: {
        path:  path.join(__dirname, '/output'),
        publicPath: '/',
        filename: 'output-bundle.js'
    },
    resolve: {
      modules: ['node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        port: 9000
    },
    module: {
      rules: [
          {
              test: /\.less$/,
              use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                  { loader: 'less-loader' }
              ]
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
          },
      ]
    },
}

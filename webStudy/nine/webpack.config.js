const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //mode: 'development',
  entry: {
    index: './src/index.js',
  },
  // devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ES6 Toutiao Project',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
        {
            test: /.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }
    ]
  }
};
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client',
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'common'
    ],
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
};

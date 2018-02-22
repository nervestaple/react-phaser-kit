const path = require('path');
const pkg = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libraryName = pkg.name;

const config = {
  entry: path.join(__dirname, '/src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: `${libraryName}.min.js`,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
};

module.exports = config;

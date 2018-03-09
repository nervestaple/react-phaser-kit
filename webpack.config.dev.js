const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    vendor: ['react', 'react-reconciler', 'phaser', 'lodash', 'events', 'prop-types', 'performance-now'],
    reactPhaserExample: './example/reactPhaserExample.js',
    reactDOMExample: './example/reactDOMExample.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /(src|example)/,
        use: { loader: 'babel-loader' },
      },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader' },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader' },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: JSON.stringify(process.env.DEBUG),
      },
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      title: 'ReactPhaser examples',
      inject: true,
      chunks: [],
      template: './example/indexTemplate.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Example with ReactPhaser rendering',
      inject: true,
      chunks: ['vendor', 'reactPhaserExample'],
      template: './example/exampleTemplate.html',
      filename: 'reactPhaserExample.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Example with ReactDOM/hybrid rendering',
      inject: true,
      chunks: ['vendor', 'reactDOMExample'],
      template: './example/exampleTemplate.html',
      filename: 'reactDOMExample.html',
    }),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[chunkhash].min.js',
  },
};

if (process.env.WEBPACK_WATCH === 'true') {
  config.watch = true;
  config.watchOptions = { aggregateTimeout: 500, poll: 1000 };
}

module.exports = config;

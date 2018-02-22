const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatefulReactContainerPlugin = require('stateful-react-container-webpack-plugin');

const config = {
  entry: [
    './example/example.js',
  ],
  devtool: 'source-map',
  watch: true,
  watchOptions: { aggregateTimeout: 500, poll: 1000 },
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
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: JSON.stringify(process.env.DEBUG),
      },
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin(),
    new StatefulReactContainerPlugin({ noState: true }),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'main.js',
  },
};

module.exports = config;

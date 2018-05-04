'use strict';
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PARTIALS_PATH = path.resolve(__dirname, "..", "layouts", "partials");
const ASSETS_PATH = path.resolve(__dirname, "..", "static", "assets");


const css_plugin = new ExtractTextPlugin({
  allChunks: true,
  filename: 'bundle.[chunkhash].css'
});
const css_loader = css_plugin.extract({
  fallback: 'style-loader',
  use: [{
    loader: 'css-loader'
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: function () {
        return [
          require('precss'),
          require('autoprefixer')
        ];
      }
    }
  }, {
    loader: 'sass-loader'
  }]
});
const css_partial = new HtmlWebpackPlugin({
  filename: path.join(PARTIALS_PATH, 'css.html'),
  template: 'ejs-loader!css_partial.ejs',
  inject: false,
});
const css = {
  entry: "./scss/index.scss",
  module: {
    rules: [{
      test: /\.(png)$/,
      use: 'url-loader'
    }, {
      test: /\.(scss)$/,
      use: css_loader
    }]
  },
  output: {
    path: ASSETS_PATH,
    filename: "bundle.[chunkhash].css",
    publicPath: "assets/",
  },
  plugins: [
    new CleanWebpackPlugin([ASSETS_PATH], {allowExternal: true}),
    css_plugin,
    css_partial
  ]
};


const js_partial = new HtmlWebpackPlugin({
  filename: path.join(PARTIALS_PATH, 'js.html'),
  template: 'ejs-loader!js_partial.ejs',
  inject: false,
});
const js = {
  entry: "./js/index.js",
  output: {
    path: ASSETS_PATH,
    filename: "bundle.[chunkhash].js",
    publicPath: "/assets/",
  },
  plugins: [
    js_partial
  ]
};


module.exports = [css, js];

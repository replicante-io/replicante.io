'use strict';
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const THEME_BASEOF_FILENAME = path.resolve(__dirname, '..', 'layouts', '_default', 'baseof.html');
const THEME_STATIC_ASSETS_PATH = path.resolve(__dirname, '..', 'static', 'assets');

const RULES_CSS = {
  test: /\.(sa|sc|c)ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
};

module.exports = {
  entry: {
    index: './index.js',
  },
  module: {
    rules: [
      RULES_CSS,
    ],
  },
  output: {
    clean: true,
    filename: '[name].[chunkhash].js',
    path: THEME_STATIC_ASSETS_PATH,
    publicPath: '/assets/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: THEME_BASEOF_FILENAME,
      template: 'baseof.html.ejs',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),
  ],
}

'use strict';
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const PARTIALS_PATH = path.resolve(__dirname, "..", "layouts", "partials");
const ASSETS_PATH = path.resolve(__dirname, "..", "static", "assets");


const css_plugin = new MiniCssExtractPlugin({
  allChunks: true,
  filename: 'bundle.[chunkhash].css'
});
const css_loader = [{
  loader: MiniCssExtractPlugin.loader
}, {
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
}];
const css_partial = new HtmlWebpackPlugin({
  filename: path.join(PARTIALS_PATH, 'css.html'),
  template: 'ejs-loader!css_partial.ejs',
  inject: false,
  minify: false,
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
  name: 'styles',
  output: {
    path: ASSETS_PATH,
    publicPath: "assets/",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ASSETS_PATH + "/*.css"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
    }),
    css_plugin,
    css_partial,
    // This plugin greates an extra main.js which pollutes the assets.
    // Once the build is complete remove it.
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [],
      cleanAfterEveryBuildPatterns: [ASSETS_PATH + "/main.js"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
    }),
  ]
};


const js_partial = new HtmlWebpackPlugin({
  filename: path.join(PARTIALS_PATH, 'js.html'),
  template: 'ejs-loader!js_partial.ejs',
  inject: false,
  minify: false,
});
const js = {
  entry: "./js/index.js",
  name: 'js',
  output: {
    path: ASSETS_PATH,
    filename: "bundle.[chunkhash].js",
    publicPath: "/assets/",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ASSETS_PATH + "/*.js"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
    }),
    js_partial
  ]
};


module.exports = [css, js];

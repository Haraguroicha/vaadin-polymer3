const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pkg = require('./package.json');

const extractSass = new ExtractTextPlugin({
  filename: "vaadin.css",
  publicPath: path.resolve(__dirname, 'dist')
});

const sassOptions = {
  sourceMap: true,
  includePaths: [ path.resolve(__dirname, '_sass') ]
};

module.exports = {
  entry: {
    app: './src/index'
  },
  output: {
    filename: "vaadin.js",
    library: "vaadin-polymer3",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",   // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          }, {
            loader: "sass-loader",  // compiles Sass to CSS
            options: sassOptions
          }],
          // use style-loader in development
          fallback: "style-loader"  // creates style nodes from JS strings
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'       // html loader
        }, {
          loader: 'polymer-sass-loader',
          options: sassOptions
        }, {
          loader: 'preprocess-loader' // resolve for <!-- @action -->
        }]
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  externals: Object.keys(pkg.devDependencies).concat([/@polymer|@webcomponents/]),
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname) }),
    extractSass,
    // copy custom static assets
    new CopyWebpackPlugin([]),
    // get around with stupid warning
    new webpack.IgnorePlugin(/vertx/),
  ]
};

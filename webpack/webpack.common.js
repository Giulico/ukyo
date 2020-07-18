const fs = require('fs')

// Plugins
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

const paths = require('./paths')

const pugTemplates = []
const srcll = fs.readdirSync(paths.dirSrcPug)
srcll.forEach((s) => s.endsWith('.pug') && pugTemplates.push(s))

module.exports = {
  entry: {
    app: path.join(paths.dirSrcJs, 'app.js'),
    vendor: ['whatwg-fetch'],
  },
  output: {
    path: paths.dirDist,
    filename: 'js/[name].js',
  },
  stats: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.pug$/,
        use: [
          { loader: 'raw-loader' },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hrm: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    ...pugTemplates.map(
      (templateName) =>
        new HtmlWebPackPlugin({
          inject: true,
          template: `./src/pug/${templateName}`,
          filename: path.join(
            paths.dirDist,
            templateName.replace('.pug', '.html')
          ),
          minify: false,
          alwaysWriteToDisk: true,
        })
    ),
    new MiniCssExtractPlugin({
      filename: 'css/app.css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }],
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
}

const fs = require('fs')
const baseConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// Paths
const { configOverride } = require('./paths')

let config = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
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
})

if (fs.existsSync(configOverride)) {
  try {
    const override = require(configOverride).prod
    if (typeof override === 'function') {
      config = override(config)
    } else {
      throw new Error("config.override.js doesn't export a prod function")
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = config

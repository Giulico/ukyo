const fs = require('fs')
const baseConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

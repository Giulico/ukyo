const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { merge } = require('webpack-merge')

const openBrowser = require('../utils/openBrowser')
const commonConfig = require('./webpack.common')
const clearConsole = require('../utils/clearConsole')
const isInteractive = process.stdout.isTTY

const { configOverride } = require('./paths')
const { PORT } = require('./const')
const HOST = process.env.HOST || '0.0.0.0'

//
// DEV Config
//
let config = merge(commonConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
})

//
// Override handler
//
if (fs.existsSync(configOverride)) {
  try {
    const override = require(configOverride).dev
    if (typeof override === 'function') {
      config = override(config)
    } else {
      throw new Error("config.override.js doesn't export a prod function")
    }
  } catch (err) {
    console.log(err)
  }
}

//
// Dev server
//
const serverOptions = {
  compress: true,
  quiet: true,
  historyApiFallback: true,
  stats: {
    assets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    entrypoints: false,
    hash: false,
    modules: false,
    timings: false,
    version: false,
  },
  lazy: false,
  hot: true,
  host: HOST,
  port: PORT,
  clientLogLevel: 'error',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}

// WebpackDevServer.addDevServerEntrypoints(config, serverOptions)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, serverOptions)

server.listen(PORT, HOST, (err) => {
  if (err) {
    return console.log(err)
  }
  if (isInteractive) {
    clearConsole()
  }
  openBrowser(`http://localhost:${PORT}`)
  console.log(`Server started at: http://localhost:${PORT}`)
})

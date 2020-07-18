const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

const { PORT } = require('./const')

const config = merge(commonConfig, {
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

const serverOptions = {
  compress: true,
  quiet: true,
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
  hot: true,
  lazy: false,
  host: 'localhost',
  port: PORT,
  clientLogLevel: 'error',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}

// WebpackDevServer.addDevServerEntrypoints(config, serverOptions)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, serverOptions)

server.listen(PORT, 'localhost', () => {
  console.log(`Server started at: http://localhost:${PORT}`)
})

const fs = require('fs')

// Plugins
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { entryApp, outputApp, dirPugTemplates } = require('./paths')

const pugTemplates = []
const srcll = fs.readdirSync(dirPugTemplates)
srcll.forEach((s) => s.endsWith('.pug') && pugTemplates.push(s))

module.exports = {
  entry: [entryApp],
  output: {
    path: outputApp,
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name]-[contenthash].js'
        : '[name].[hash].js',
  },
  stats: 'normal',
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
          template: `${dirPugTemplates}/${templateName}`,
          minify: false,
          alwaysWriteToDisk: true,
        })
    ),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === 'production'
          ? '[name]-[contenthash].css'
          : '[name]-[hash].css',
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

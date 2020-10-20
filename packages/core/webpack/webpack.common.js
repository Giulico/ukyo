const fs = require('fs')

// Plugins
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { entryApp, outputApp, dirPugTemplates } = require('./paths')

const pugTemplates = []
const srcll = fs.readdirSync(dirPugTemplates)
srcll.forEach((s) => s.endsWith('.pug') && pugTemplates.push(s))

module.exports = {
  entry: {
    app: entryApp,
  },
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
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
    ],
  },
  plugins: [
    ...pugTemplates.map((templateName) => {
      const [name] = templateName.split('.')
      const folder = name === 'index' ? '' : `/${name}`
      return new HtmlWebPackPlugin({
        inject: true,
        template: `${dirPugTemplates}/${templateName}`,
        filename: `${outputApp}${folder}/index.html`,
        minify: false,
        alwaysWriteToDisk: true,
      })
    }),
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
}

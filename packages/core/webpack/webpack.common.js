const fs = require('fs')

// Plugins
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const {
  entryApp,
  outputApp,
  dirPugTemplates,
  appPackageJson,
} = require('./paths')

// List pug templates to use them with HtmlWebPackPlugin
const pugTemplates = []
const srcll = fs.readdirSync(dirPugTemplates)
srcll.forEach((s) => s.endsWith('.pug') && pugTemplates.push(s))

// Browserslist config in <app>/package.json
const customPackageJson = require(appPackageJson)
const customTargets =
  customPackageJson && customPackageJson.browserslist
    ? [customPackageJson.browserslist]
    : []

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
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: 3, proposals: true },
                  targets: [].concat(customTargets),
                },
              ],
            ],
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
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }],
      },
      {
        test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
            loader: 'file-loader'
        }]
      }
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

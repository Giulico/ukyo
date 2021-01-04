const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const dirPugTemplates = resolveApp('src/pug')
const entryApp = resolveApp('src/js/app.js')
const outputApp = resolveApp('dist')
const configOverride = resolveApp('config.override.js')
const appPackageJson = resolveApp('./package.json')

module.exports = {
  appPackageJson,
  dirPugTemplates,
  entryApp,
  outputApp,
  configOverride,
}

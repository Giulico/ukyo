const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const entryApp = resolveApp('src/js/app.js')
const dirPugTemplates = resolveApp('src/pug')
const outputApp = resolveApp('dist')

module.exports = {
  entryApp,
  outputApp,
  dirPugTemplates,
}

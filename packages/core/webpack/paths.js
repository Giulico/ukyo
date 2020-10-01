const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const entryApp = resolveApp('src/js/app.js')
const dirPugTemplates = resolveApp('src/pug')
const dirDist = resolveApp('dist')
const outputApp = resolveApp('dist/js')
const rootPath = path.resolve(__dirname, '..')
const dirDistJs = path.join(dirDist, 'js')
const dirDistStyle = path.join(dirDist, 'css')
const dirSrc = path.join(rootPath, 'src')
const dirSrcJs = path.join(dirSrc, 'js')
const dirSrcStyle = path.resolve(dirSrc, 'scss')

module.exports = {
  entryApp,
  outputApp,
  dirPugTemplates,
  rootPath,
  dirDist,
  dirDistJs,
  dirDistStyle,
  dirSrc,
  dirSrcJs,
  dirSrcStyle,
}

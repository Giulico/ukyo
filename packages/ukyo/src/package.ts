const fs = require('fs')
const _ = require('lodash')
const path = require('path')

module.exports = editPackage

function editPackage() {
  const appDirectory = fs.realpathSync(process.cwd())
  const packageJson = require(path.join(appDirectory, './package.json'))

  if (packageJson) {
    _.set(packageJson, 'scripts.start', 'genma-webpack start')
    _.set(packageJson, 'scripts.build', 'genma-webpack build')
    _.set(packageJson, 'browserslist', 'last 2 versions')
  }

  fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
    if (err) {
      throw err
    }
  })
}

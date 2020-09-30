#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

const { spawnSync } = require('child_process')

// cross-env webpack --progress --hide-modules --config ./webpack/webpack.prod.js
spawnSync(
  'cross-env',
  [
    'webpack',
    '--progress',
    '--hide-modules',
    '--config',
    require.resolve(`../webpack/webpack.prod.js`),
  ],
  {
    stdio: 'inherit',
  }
)

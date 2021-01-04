#!/usr/bin/env node

const { spawnSync } = require('child_process')

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

spawnSync('node', [require.resolve(`../webpack/webpack.dev.js`)], {
  stdio: 'inherit',
})

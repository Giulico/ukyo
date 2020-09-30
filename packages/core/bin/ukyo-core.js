#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

const { spawnSync } = require('child_process')

const args = process.argv.slice(2)

const scriptIndex = args.findIndex((x) => x === 'build' || x === 'start')
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

if (['build', 'start'].includes(script)) {
  spawnSync('node', [require.resolve(`../scripts/${script}.js`)], {
    stdio: 'inherit',
  })
}

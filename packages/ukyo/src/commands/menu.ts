import { Command, flags } from '@oclif/command'
import { createFolder } from '../utils'

// Propts
import { pMenu, pPackageManager, pSrcFolder } from '../prompts'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chalk = require('chalk')
const { execFile, execFileSync } = require('child_process')
const rimraf = require('rimraf')

const editPackage = require('../package.ts')

const ora = require('ora')
const log = console.log

// Paths
const appDirectory = fs.realpathSync(process.cwd())
const srcDirectory = path.resolve(appDirectory, 'src')
const appPackageJson = path.resolve(appDirectory, 'package.json')
const templateDirectory = path.resolve(
  appDirectory,
  'node_modules/@ukyo-cli/core/src'
)
const ukyoPackage = require('../../package.json')

export default class Hello extends Command {
  static aliases = [''] // Default command

  static description = 'describe the command here'

  static examples = [
    `$ ukyo menu
    OR
    $ ukyo menu --help`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [{ name: 'file' }]

  async run() {
    this.showMenu()
  }

  showMenu() {
    pMenu
      .run()
      .then(async (answers) => {
        if (answers === 'upgrade') {
          log(
            chalk.cyan(
              `--------------------------------------------\nto upgrade use npm update or yarn upgrade\n--------------------------------------------`
            )
          )
          process.exit(1)
        }

        if (answers === 'install') {
          // Check if ./src folder already exists and delete it
          if (fs.existsSync(srcDirectory)) {
            await this.srcAlreadyExists()
          } else {
            createFolder(srcDirectory)
          }

          const packageManager = await pPackageManager.run()

          // Check if package.json exists and create it
          if (!fs.existsSync(appPackageJson)) {
            log(chalk.cyan('Creating package.json...'))
            try {
              execFileSync(packageManager, ['init', '-y'], { stdio: 'inherit' })
            } catch (e) {
              log(chalk.red('Ukyo fails to initialize project.'))
              console.log(e.stderr)
              process.exit(0)
            }
          }

          // Install dependencies
          const spinner = ora({
            text: 'Installing Ukyo....',
            color: 'yellow',
            spinner: 'growVertical',
          }).start()

          try {
            // clearConsole()
            // printBanner(ukyoPackage.version)
            const dependencies = ['@ukyo-cli/core']
            const installCommand = packageManager === 'npm' ? 'i' : 'add'
            // Need to wrap to make spinner works
            await new Promise((resolve) => {
              execFile(
                packageManager,
                [installCommand].concat(dependencies),
                { stdio: 'pipe' },
                resolve
              )
            })
            spinner.succeed()
          } catch (e) {
            log(chalk.red('Ukyo fails to intall the dependencies.'))
            log(
              chalk.red(
                'The installation process will continue. Please use `npm i` at the end of the process.'
              )
            )
            spinner.fail()
            console.log(e.stderr)
          }

          // Update package.json
          editPackage()

          // Copy the minimum tree of folder
          const ncp = require('ncp').ncp

          ncp(templateDirectory, srcDirectory, (err) => {
            if (err) {
              return console.error(err)
            }
          })

          // Congratulation message
          // clearConsole()

          // printBanner(ukyoPackage.version)
          log(chalk.bold.green(`Ukyo is ready!`))
          log(chalk.cyan(`Run: ${packageManager} start`))
        }
      })
      .catch(log)
  }

  srcAlreadyExists() {
    return pSrcFolder
      .run()
      .then((answers) => {
        if (answers === 'override') {
          // Delete src folder
          rimraf.sync(srcDirectory)
        } else {
          // Quit cli
          process.exit(1)
        }
      })
      .catch(console.log)
  }
}

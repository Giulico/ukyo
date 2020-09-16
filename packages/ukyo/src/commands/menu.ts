import { Command, flags } from '@oclif/command'
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chalk = require('chalk')
const { execFileSync } = require('child_process')
const { Select } = require('enquirer')
const rimraf = require('rimraf')

const editPackage = require('../package.ts')

const log = console.log

// Paths
const appDirectory = fs.realpathSync(process.cwd())
const srcDirectory = path.resolve(appDirectory, 'src')
const appPackageJson = path.resolve(appDirectory, 'package.json')
// const templateDirectory = path.resolve(
//   appDirectory,
//   'node_modules/@genma/template/src'
// )
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
    const prompt = new Select({
      type: 'list',
      name: 'start',
      message: 'What are you looking for?',
      choices: [
        {
          message: 'I want to install a fresh version of Ukyo on this folder',
          name: 'install',
        },
        {
          message: 'I want to upgrade Ukyo',
          name: 'upgrade',
        },
      ],
    })

    prompt
      .run()
      .then(async (answers) => {
        log(answers)
        if (answers === 'install') {
          // Check if ./src folder already exists and delete it
          if (fs.existsSync(srcDirectory)) {
            await this.srcAlreadyExists()
          }

          // Check if package.json exists and create it
          if (!fs.existsSync(appPackageJson)) {
            log(chalk.cyan('Creating package.json...'))
            try {
              execFileSync('npm', ['init'], { stdio: 'inherit' })
            } catch (e) {
              log(chalk.red('Ukyo fails to initialize project.'))
              console.log(e.stderr)
              process.exit(0)
            }
          }

          // Install dependencies
          try {
            // clearConsole()
            // printBanner(ukyoPackage.version)
            log(chalk.cyan('Installing dependencies...'))
            // const dependencies = ['@genma/webpack-common', '@genma/template']
            // execFileSync('npm', ['i'].concat(dependencies), { stdio: 'pipe' })
          } catch (e) {
            log(chalk.red('Ukyo fails to intall the dependencies.'))
            log(
              chalk.red(
                'The installation process will continue. Please use `npm i` at the end of the process.'
              )
            )
            console.log(e.stderr)
          }

          // Update package.json
          editPackage()

          // Copy the minimum tree of folder
          /*
          const ncp = require('ncp').ncp

          ncp(templateDirectory, appDirectory, (err) => {
            if (err) {
              return console.error(err)
            }
          })

          // Congratulation message
          clearConsole()
          printBanner(ukyoPackage.version)
          */
          log(chalk.bold.green('Congratulation!'))
          log(chalk.green('Ukyo is ready. Use `npm start`'))
        }
      })
      .catch(log)
  }

  srcAlreadyExists() {
    const prompt = new Select({
      type: 'list',
      message: "The folder './src' already exists. Override it?",
      name: 'src-folder',
      choices: [
        {
          message:
            "Yes, remove './src' folder and start with a fresh copy of it",
          name: 'override',
        },
        {
          message: "No, wait! Exit Ukyo, I'll handle this by my self.",
          name: 'exit',
        },
      ],
    })

    return prompt
      .run()
      .then((answers) => {
        if (answers['src-folder'] === 'override') {
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

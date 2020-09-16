ukyo-cli
========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ukyo-cli.svg)](https://npmjs.org/package/ukyo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/ukyo-cli.svg)](https://npmjs.org/package/ukyo-cli)
[![License](https://img.shields.io/npm/l/ukyo-cli.svg)](https://github.com/Giulico/ukyo-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ukyo-cli
$ ukyo-cli COMMAND
running command...
$ ukyo-cli (-v|--version|version)
ukyo-cli/0.0.0 darwin-x64 node-v12.18.3
$ ukyo-cli --help [COMMAND]
USAGE
  $ ukyo-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ukyo-cli hello [FILE]`](#ukyo-cli-hello-file)
* [`ukyo-cli help [COMMAND]`](#ukyo-cli-help-command)

## `ukyo-cli hello [FILE]`

describe the command here

```
USAGE
  $ ukyo-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ ukyo-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Giulico/ukyo-cli/blob/v0.0.0/src/commands/hello.ts)_

## `ukyo-cli help [COMMAND]`

display help for ukyo-cli

```
USAGE
  $ ukyo-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->

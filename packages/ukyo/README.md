usemepls
========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/usemepls.svg)](https://npmjs.org/package/usemepls)
[![Downloads/week](https://img.shields.io/npm/dw/usemepls.svg)](https://npmjs.org/package/usemepls)
[![License](https://img.shields.io/npm/l/usemepls.svg)](https://github.com/Giulico/usemepls/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g usemepls
$ usemepls COMMAND
running command...
$ usemepls (-v|--version|version)
usemepls/0.0.0 darwin-x64 node-v12.18.3
$ usemepls --help [COMMAND]
USAGE
  $ usemepls COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`usemepls hello [FILE]`](#usemepls-hello-file)
* [`usemepls help [COMMAND]`](#usemepls-help-command)

## `usemepls hello [FILE]`

describe the command here

```
USAGE
  $ usemepls hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ usemepls hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Giulico/usemepls/blob/v0.0.0/src/commands/hello.ts)_

## `usemepls help [COMMAND]`

display help for usemepls

```
USAGE
  $ usemepls help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->

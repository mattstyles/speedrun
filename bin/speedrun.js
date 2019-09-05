#!/usr/bin/env node

const pkg = require('../package.json')
const { run } = require('../')

const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    v: 'version',
    o: 'open',
    p: 'port'
  },
  default: {
    open: true,
    port: 3000
  }
})

if (argv.v) {
  console.log(pkg.name, pkg.version)
  process.exit(0)
}

if (!argv._.length) {
  console.log('Supply a file path to run')
  process.exit(1)
}

run({
  entry: argv._[0],
  port: argv.port,
  autoOpen: argv.open === 'true' || argv.open === true || argv.open > 0
})

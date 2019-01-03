#!/usr/bin/env node

const pkg = require('../package.json')
const { run } = require('../')

const argv = require('minimist')(process.argv.slice(2), {
  v: 'version'
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
  entry: argv._[0]
})

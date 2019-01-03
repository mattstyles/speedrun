
// @TODO set an engines field

const Bundler = require('parcel-bundler')
const opn = require('opn')
const getPort = require('get-port')

const DEFAULT_PORT = 3000

async function serve (bundle) {
  console.log(bundle)
}

exports.run = async function run (options) {
  const opts = Object.assign({
    entry: './',
    port: DEFAULT_PORT
  }, options)

  const bundler = new Bundler(opts.entry)
  bundler.on('bundled', serve)

  const port = await getPort({
    port: opts.port
  })
  await bundler.serve(port)
  opn(`http://0.0.0.0:${port}`)
}

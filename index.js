
// @TODO set an engines field
const fs = require('fs')
// const os = require('os')
const path = require('path')
const debug = require('debug')('speedrun')

const Bundler = require('parcel-bundler')
const opn = require('opn')
const getPort = require('get-port')
const { generateHash } = require('random-hash')
const html = require('simple-html-index')
const rimraf = require('rimraf')

const DEFAULT_PORT = 3000

const onChange = (bundle) => {
  // console.log(bundle)
}

const onBuildEnd = (opts) => () => {
  debug('Build complete.')
  if (opts.deleteHtml) {
    debug('Deleting ', opts.entry)
    // rimraf.sync(opts.entry)
  }
}

const onBuildError = (error) => {
  console.error(error)
}

const onProcessEnd = (opts) => () => {
  debug('Process clean up')
  if (opts.deleteHtml) {
    debug('Deleting ', opts.entry)
    rimraf.sync(opts.entry)
  }
  process.exit(1)
}

const isHTMLPath = (entry) => /\.html$/.test(entry)

function createIndex (entry) {
  const basename = path.basename(entry.replace(path.extname(entry), ''))
  // const filepath = `${os.tmpdir()}/${basename}.${generateHash()}.html`
  const filepath = `${basename}.${generateHash()}.html`

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filepath)
      .on('close', () => resolve(filepath))
      .on('error', reject)

    html({
      title: basename,
      entry
    })
      .pipe(stream)
  })
}

async function bundle (opts) {
  const bundler = new Bundler(opts.entry)
  bundler.on('bundled', onChange)
  bundler.on('buildEnd', onBuildEnd(opts))
  bundler.on('buildError', onBuildError)

  debug('Attempting to find port', opts.port)
  const port = await getPort({
    port: opts.port
  })
  debug('Bundler serving to port', port)
  await bundler.serve(port)
  debug('Opening browser')
  opn(`http://0.0.0.0:${port}`)
}

exports.run = async function run (options) {
  const opts = Object.assign({
    entry: './',
    port: DEFAULT_PORT,
    deleteHtml: false,
    autoOpen: true
  }, options)

  // Generate HTML if not supplied
  if (!isHTMLPath(opts.entry)) {
    try {
      debug('No index file supplied, creating one.')
      const filename = await createIndex(opts.entry)
      debug('Temporary index created at', filename)
      opts.entry = filename
      opts.deleteHtml = true
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

  process.on('SIGINT', onProcessEnd(opts))
  // process.on('SIGTERM', onProcessEnd(opts))

  bundle(opts)
}

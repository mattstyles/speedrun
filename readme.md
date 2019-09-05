
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/mattstyles/speedrun.svg)](https://david-dm.org/mattstyles/speedrun)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Speedrun

Useful for quickly getting demos up and running with a js build chain, using [Parcel](https://parceljs.org/).

## Getting Started

### Quick Start

Best used locally to the demo project you’re working on and run using [npm scripts](https://docs.npmjs.com/misc/scripts).

* Create an entry point, either an html file or a js file
* Add `speedrun` to your project
* Add a start task as an npm script

```sh
npm i -D speedrun
```

```json
"scripts": {
  "start": "speedrun main.js"
}
```

```sh
npm start
```

Given a `main.js` file then the above steps will scaffold an html file, use `parcel` to create a bundle and start a dev server to run your project. The running task will be watching for changes.

### Global

`speedrun` works equally as well as a global install, but local is generally preferred.

```sh
npm i -g speedrun
speedrun main.js
```

### Programmatic

`speedrun` can also be run programmatically.

```sh
npm i -D speedrun
```

```js
const { run } = require('speedrun')

run({
  entry: './main.js'
})
```

## Detailed Start

`speedrun` is a simplified wrapper around `parcel`. It is very deliberately simplified as it should only be used for tests and demos. If your use-case requires more control over the `parcel bundler` API then it’s worth writing that wrapper yourself, feel free to use `speedrun`s `index.js` to help although it doesn’t do anything (other than scaffold an html file when required) that isn’t outlined in detail in the [parcel API documentation](https://parceljs.org/api.html).

Parcel gives you access to a modern JS toolchain with zero config (other bundlers also offer this, but `speedrun` uses `parcel`). Parcel requires an `html` file as an entry point which is usually a good thing to create, but, sometimes you just want to fire some JS in to the browser without mucking around, which is where `speedrun` comes in.

Create a new project, add a JS file to it and create a `package.json` for npm:

```sh
mkdir my-awesome-demo
cd my-awesome-demo
touch main.js
npm init -y
```

Add some JS to `main.js` (feel free to use the latest JS language features, including ES6 modules, although `parcel` offers you far more than only this):

```js
const echo = str => console.log(str)
echo('Arrow functions are supported almost everywhere 😂, this example is terrible!')
```

See [https://parceljs.org/](https://parceljs.org/) for some more things you now have access to for your demo.

Now add `speedrun` to your project:

```sh
npm i -D speedrun
```

This will have installed `parcel-bundler` too (as well as some other stuff).

Add an `npm start` script to your `package.json` (if you followed the above steps to the letter there will already be a `test` script scaffold in there, leave it or delete as you like, this project is only a demo right?):

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "speedrun main.js"
}
```

Finally, run that start script and `speedrun` will generate a (very) basic html file for you and poke at `parcel` to do all the heavy lifting:

```sh
npm start
```

Parcel will now be running in dev and watch modes, so go ahead and play with your `main.js` file all you like and get access to all the stuff (including HMR) that parcel gives you.

Note that to keep paths consistent `speedrun` will generate an html file for you in the current directory, it will always take the name of the entry point you supply and add a hash to it, so, if you’re worried about accidentally committing it then add `main.*.html` to your `.gitignore` (if using `main.js` as an entry point).

Don’t worry too much though, `speedrun` will delete the generated html file for you when it finishes.

## Customising Parcel

`speedrun` currently does not expose any method for adding options to parcel-bundler, this is by design. Quick tests and demos seldom should rely on more complex configuration. If parcel defaults aren’t sufficient for your demo then it’s worth spending a few minutes writing a quick script yourself, feel free to use the `index.js` file within `speedrun` as a starting point, but reading through the [parcel API docs](https://parceljs.org/api.html) will get you further faster.

There’s nothing wrong with starting with `speedrun` and adding real build and run scripts later if your demo evolves. `speedrun` just uses `parcel` to do 99% of the work, so use the parcel docs to help you create build and watch tasks.

If you wanted to add some config, like babel config for example, then if `parcel` supports it then so will `speedrun`.

## API

`speedrun` exposes just one method, `run`, which accepts some parameters:

```js
{
  entry: './',
  port: 3000,
  deleteHtml: false,
  autoOpen: true
}
```

These default options will be supplied if you don’t supply keys, e.g:

```js
import { run } from 'speedrun'

run({
  entry: './main.js',
  autoOpen: false
})
```

The above script will not automatically launch the browser but will create scaffold an html and run the `main.js` script.

### `entry` [`string`]

This entry point for the project.

Parcel supports multiple entry points, `speedrun` supports multiple html entry points **only**. If you give it multiple JS entry points, it won’t work.

Add it as an argument to the cli, i.e.

```sh
speedrun main.js
```

### `port` [`int`]

Supply a specific port. `speedrun` will attempt to use the port you supply, or 3000 if you leave the default, but it will also try other ports if that one is busy.

Pass as `-p` or `--port` to the cli.

### `deleteHtml` [`boolean`]

If you don’t want to delete the generated html one when you use a js file as an entry point then supply false. Ordinarily you won’t want to do this, the generated html is not very interesting.

This option can not be passed via the cli.

### `autoOpen` [`boolean`]

If you want to stop `speedrun` from attempting to launch your browser then supply false.

Pass as `-o` or `--open` to the cli.

## Contributing

Pull requests are always welcome, the project uses the [standard](http://standardjs.com) code style.

For bugs and feature requests, [please create an issue](https://github.com/mattstyles/speedrun/issues).

## License

MIT

node-rsyncer
====

<img src="http://1.bp.blogspot.com/-ff99d8Ohm84/TfPUIEA_KyI/AAAAAAAAABE/iW6k1SYSuiQ/s380/cartoon4.jpg">

# node-rsyncer

## what?

A continuous `rsync` runner to keep local and remote directories in sync.  It watches the source directory tree for any changes, and immediately invokes the specified rsync command.

## install

*npm*

```sh
$ [sudo] npm install rsyncer -g
```

## usage

`node-rsyncer` comes with an executable `nsysncer(1)` that you will use to sync and/or watch your directories/files

The api is simple:

```sh
Usage: nsyncer [options] [command]

  Commands:

    start                  Starts the rsyncer

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -W, --watch    Watch files and sync
    -v, --verbose  Show verbose output
    -D, --debug    Show debug output
```

You can easily start syncing your files or directories with a configuration file

```sh
$ nsyncer start ./config.json
nsyncer: sync complete
```

You can watch for changes with the `---watch` flag

```sh
nsyncer: watch: /Users/jwerle/repos/node-rsyncer/tmp/src/ (watching:true)
nsyncer: sync complete
nsyncer: change: update: (/Users/jwerle/repos/node-rsyncer/tmp/src/bar.data)
nsyncer: sync complete
```

## api

### command line `nsyncer(1)`

You can use the command line executable to sync your files to a remote location

```sh
$ nsyncer [command] [args] [flags]
```

commands:

* `start` - Start rsyncer
  * accepts a file path argument to a config file

flags:

* `-W, --watch` - Watch files and sync
* `-v, --verbose` - Show verbose output
* `-D, --debug` -  Show debug output

*example*

```sh
$ nsyncer start ./config.json --watch --verbose
nsyncer: watch: /Users/jwerle/repos/node-rsyncer/tmp/src/ (watching:true)
nsyncer: sync complete
```

---

### rsyncer(config)

Accepts a configuration object

* `watch` - A boolean indicating whether to watch the `src` paths for changes and sync to the `dst` paths. (Default: `false`)
* `recursive` - A boolean whether to recursively sync paths. (Default: `true`)
* `delete` - A boolean whether delete extraneous files from destination dirs. (Default `true`)
* `csvExclude` - A boolean whether auto-ignore files the same way CVS does. (Default: `true`)
* `links` - A boolean whether copy symlinks as symlinks (Default: `true`)
* `paths` - An array of objects, each with the following properties:
* `src` - The source file or directory to watch.
* `dst` - The destination file or directory to write to.
* `args` - (optional) An array of string arguments, that will be passed directly to `rsync`.  These will be the **default** set of args passed to **all** paths that do not have `args` defined.  If `args` is defined on both the path, and the top level, **only** the path's `args` will be used.

A configuration json file can look like this:

```json
{
  "links": false,
  "delete": false,
  "paths": [{
    "src" : "/Users/jwerle/repos/node-rsyncer/tmp/src/test.data",
    "dst" : "localhost:/Users/jwerle/repos/node-rsyncer/tmp/dst"
  }, {
    "src" : "/Users/jwerle/repos/node-rsyncer/tmp/src/foo.data",
    "dst" : "localhost:/Users/jwerle/repos/node-rsyncer/tmp/dst"
  }, {
    "src" : "/Users/jwerle/repos/node-rsyncer/tmp/src/bar.data",
    "dst" : "localhost:/Users/jwerle/repos/node-rsyncer/tmp/dst"
  }]
}
```

*example*

```js
var rsyncer = require('rsyncer')
var syncer = rsyncer(require('./config.json'))
```

## contributors

* [zivester](https://github.com/zivester)
* [werle](https://github.com/jwerle)

## development

You must ensure you can ssh to `localhost` and that you're machines identity is in your `~/.ssh/authorized_keys` file

To add it simply do:

```sh
$ touch ~/.ssh/authorized_keys;  cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

***ONLY DO THIS ONCE***

## todo

* cli
* tests
* documentation

## license

MIT
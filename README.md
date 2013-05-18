# rsyncer

A continuous `rsync` runner to keep local and remote directories in sync.  It watches the source directory tree for any changes, and immediately invokes the specified rsync command.

## install

```sh
$ npm install rsyncer -g
```

## usage

`rsyncer` comes with an executable `nsysncer(1)` that you will use to sync and/or watch your directories/files

```sh
$ nsyncer start ./config.json
```

## api

### command line `nsyncer(1)`

commands:

* `start` - Start rsyncer
  * accepts a file path argument to a config file

flags:

* `-s, --single` - Run rsync once, and exit

*example*

```sh
$ nsyncer start ./config.json --single
nsyncer: watch: /Users/jwerle/repos/node-rsyncer/tmp/src/ (watching:true)
nsyncer: sync complete
```

---

### rsyncer(config)

Accepts a configuration object

* `paths` - An array of objects, each with the following properties:
  * `src` - The source file or directory to watch.
  * `dst` - The destination file or directory to write to.
* `args` - (optional) An array of string arguments, that will be passed directly to `rsync`.  These will be the **default** set of args passed to **all** paths that do not have `args` defined.  If `args` is defined on both the path, and the top level, **only** the path's `args` will be used.

* `once` - A boolean indicating whether to run the rsync command only once. (Default: `false`)
* `recursive` - A boolean whether to recursively sync paths. (Default: `false`)
* `delete` - A boolean whether delete extraneous files from destination dirs. (Default `false`)
* `cvsExclude` - A boolean whether auto-ignore files the same way CVS does. (Default: `false`)
* `links` - A boolean whether copy symlinks as symlinks (Default: `false`)


An example configuration file: [config.example.json](https://github.com/zivester/node-rsyncer/blob/master/config.example.json)


## contributors

* [zivester](https://github.com/zivester)
* [werle](https://github.com/jwerle)


## license

MIT

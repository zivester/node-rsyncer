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

## api

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

## Config

Options are read from `config.json`.  It currently supports the following two properties:

* `paths` - An array of objects, each with the following properties:
  * `src` - The source file or directory to watch.
  * `dst` - The destination file or directory to write to.
  * `args` - (optional) An array of string arguments that will be passed directly to `rsync`.

* `args` - (optional) An array of string arguments, that will be passed directly to `rsync`.  These will be the **default** set of args passed to **all** paths that do not have `args` defined.  If `args` is defined on both the path, and the top level, **only** the path's `args` will be used.

# rsyncer

A continuous `rsync` runner to keep local and remote directories in sync.  It watches the source directory tree for any changes, and immediately invokes the specified rsync command.

## Config

Options are read from `config.json`.  It currently supports the following two properties:

* `paths` - An array of objects, each with the following properties:
  * `src` - The source file or directory to watch.
  * `dst` - The destination file or directory to write to.
  * `args` - (optional) An array of string arguments that will be passed directly to `rsync`.

* `args` - (optional) An array of string arguments, that will be passed directly to `rsync`.  These will be the **default** set of args passed to **all** paths that do not have `args` defined.  If `args` is defined on both the path, and the top level, **only** the path's `args` will be used.

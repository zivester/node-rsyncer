module.exports = function rsyncer (config) {
  var watchr = require('watchr'),
      path = require('path')
      exec = require('child_process').exec,
      paths = config.paths,
      args = config.args || []
      EventEmitter = require('events').EventEmitter
      emitter = new EventEmitter();

  var inArray = function (n, a) { return !!~a.indexOf(n); };

  if (!inArray('--rsh=ssh', args)) args.push('--rsh=ssh');
  if (config.recursive !== false) args.push('-rt');
  if (config.delete !== false) args.push('--delete');
  if (config.csvExclude !== false) args.push('-C');
  if (config.links !== false) args.push('-l')

  var jobs = paths.map(function(p){
      p.args || (p.args = args);
      if (!p.src) throw new Error("src must exist");
      if (!p.dst) throw new Error("dst must exist");
      return p;
  });

  jobs.forEach(function(job){
      var running = false,
          count = 0,
          cmd = [ 'rsync' ].concat(job.args, job.src, job.dst).join(' ');

      function go(){
          //console.log(cmd);
          running = true;
          exec(cmd, function(err, stdout, stderr){
              if (err) return emitter.emit('error', err);
              emitter.emit('sync')
              running = false;
              if (count){
                  count = 0;
                  go();
              }
          });
      }

      if (config.watch === false) return go();

      watchr.watch({ paths : [job.src], listeners : {
        log: function (level, message) {
          emitter.emit('message', level, message)
          emitter.emit('message.'+ level, message);
        },
        watching: function (err, watcher, isWatching) {
          if (err) {
            emitter.emit('error', err);
          }
          else {
            emitter.emit('watching', watcher, isWatching);
          }
        },
        change : function(type, filepath, stat, previousStat) {
          emitter.emit('change', type, filepath, stat, previousStat)
          emitter.emit(type, filepath, stat, previousStat);
            if (!running){
                go();
            }
            else {
                count++;
            }
        },
        error : function(err){
          emitter.emit('error', err);
          go();
        }
      }});

      go();
  });
  
  return emitter;
};
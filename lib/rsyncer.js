module.exports = function rsyncer (config) {
    var watchr = require('watchr'),
        path = require('path')
        exec = require('child_process').exec,
        paths = config.paths,
        args = config.args || [],
        EventEmitter = require('events').EventEmitter,
        emitter = new EventEmitter();


    if (config.recursive === true) args.push('-rt');
    if (config.delete === true) args.push('--delete');
    if (config.cvsExclude === true) args.push('-C');
    if (config.links === true) args.push('-l')

    var jobs = paths.map(function(p){
        p.args = p.args || args;
        p.disabled = typeof p.disabled !== 'undefined' ? !!p.disabled : false;
        if (!p.src) throw new Error("src must exist");
        if (!p.dst) throw new Error("dst must exist");
        return p;
    });

    jobs.forEach(function(job, i){
        var running = false,
            count = 0,
            pre = '[job ' + ++i + ( job.disabled ? ' DISABLED' : '') + '] ',
            cmd = [ 'rsync' ].concat(job.args, job.src, job.dst).join(' ');

        console.log(pre + cmd);

        // Don't run rsync if we're in test mode
        if (config.test || job.disabled) return;

        function go(){
            running = true;
            exec(cmd, function(err, stdout, stderr){
                if (err) emitter.emit('error', err);
                emitter.emit('sync')
                running = false;
                if (count){
                    count = 0;
                    go();
                }
            });
        }

        if (config.once === true) return go();

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

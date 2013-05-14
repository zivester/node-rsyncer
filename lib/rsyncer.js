var watchr = require('watchr'),
    exec = require('child_process').exec,
    conf = require('../config.json'),
    paths = conf.paths,
    args = conf.args || [];


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
        console.log(cmd);
        running = true;
        exec(cmd, function(err, stdout, stderr){
            if (err) console.error(err);
            if (stdout) console.log(stdout);
            if (stderr) console.error(stderr);
            console.log("done");
            running = false;
            if (count){
                count = 0;
                go();
            }
        });
    }

    watchr.watch({ path : job.src, listeners : {
        change : function(type, filename){
            // console.log("file changed", filename);
            if (!running){
                go();
            }
            else{
                count++;
            }
        },
        error : function(err){
            console.error('error:', err);
            go();
        }
    }});

    go();
});

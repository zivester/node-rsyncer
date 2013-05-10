var watchr = require('watchr'),
    exec = require('child_process').exec,
    conf = require('../config.json'),
    source = conf.src,
    dest = conf.dst,
    args = conf.args,
    cmd = [ 'rsync' ].concat(args, source, dest).join(' '),
    running = false,
    count = 0;

if (!source) return console.error("'src' must be defined");
if (!dest) return console.error("'dst' must be defined");


function go(){
    console.log(cmd);
    running = true;
    exec(cmd, function(err, stdout, stderr){
        // if (err) console.error(err);
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

watchr.watch({ path : source, listener : function(type, filename){
    // console.log("file changed", filename);
    if (!running){
        go();
    }
    else{
        count++;
    }
}});

// Catch unhandled errors
process.on('uncaughtException', function(exception){
    console.error(exception);
    go();
});


go();

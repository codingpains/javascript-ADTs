var resource = '',
    // semaphore = require('./boolean_semaphore').create();
    // semaphore = require('./counting_semaphore').create();
    semaphore = require('./counting_semaphore2').create();

var useResource;

useResource = function (value, done) {
    'use strict';
    resource = value;

    setTimeout(function () {
        done();
    }, 1000);
}

createProcess = function (id) {
    'use strict';
    var name = 'proc_' + id,
        proc = {},
        locks = 0,
        run;

    run = function run() {
        if (semaphore.wait() === true) {
            console.log('\nResource locked by ' + name);
            
            locks += 1;

            useResource('Resource modified by ' + name, function () {
                console.log("Checking resource from Process " + name, resource);

                semaphore.signal();
                console.log("Released resource");
                setTimeout(run, 250 * locks);
            });
        }
        else {
            console.log(name + " failed to lock resource because its locked: ", resource);
            setTimeout(run, 300);
        }
    }

    proc.run = run;

    return proc;
};

var proc1 = createProcess(1),
    proc2 = createProcess(2),
    proc3 = createProcess(3);

proc1.run();
proc2.run();
proc3.run();
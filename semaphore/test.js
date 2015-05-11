// Uncomment the semaphore you want to use
// Comment the rest of the semaphores.

var resource = '',
    semaphore = require('./boolean_semaphore').create(),
    // semaphore = require('./counting_semaphore').create(),
    // semaphore = require('./counting_semaphore2').create(),
    useResource,
    createProcess;

useResource = function (value, done) {
    'use strict';
    resource = value;

    setTimeout(function () {
        done();
    }, 1000);
};

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
        } else {
            console.log(name + " failed to lock resource because its locked: ", resource);
            setTimeout(run, 300);
        }
    };

    proc.run = run;

    return proc;
};

// Create and start procs
createProcess(1).run();
createProcess(2).run();
createProcess(3).run();
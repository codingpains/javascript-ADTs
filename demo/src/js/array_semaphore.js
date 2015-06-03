module.exports = {
    create: function createSemaphore(resourceCount) {
        'use strict';
        var lockResource,
            releaseResource,
            semaphore,
            maxResources = 1,
            availableResources = [],
            i = 0;

        if (resourceCount === undefined) {
            resourceCount = 0;
        }

        do {
            availableResources.push(1);
            i++;
        } while (i < resourceCount);


        lockResource = function () {
            if (availableResources.length === 0) {
                return false;
            } else {
                availableResources.pop();
                return true;
            }
        };

        releaseResource = function () {
            if (maxResources > availableResources.length) {
                availableResources.push(1);
            }
        };

        semaphore = {
            wait: lockResource,
            signal: releaseResource,
            getInternalState : function () {
                if (availableResources.length > 0) {
                    return 'Array semaphore: ' + availableResources.length + ' available resources';
                }
                return 'Array semaphore: No available resources';
            }
        };

        return semaphore;
    }
};
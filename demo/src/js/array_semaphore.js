module.exports = {
    create: function createSemaphore(resourceCount) {
        'use strict';
        var lockResource,
            releaseResource,
            semaphore,
            availableResources = [],
            i = 0;

        if (resourceCount === undefined) {
            resourceCount = 0;
        }

        do {
            availableResources.push(1);
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
            availableResources.push(1);
        };

        semaphore = {
            wait: lockResource,
            signal: releaseResource
        };

        return semaphore;
    }
};
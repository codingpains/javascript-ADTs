module.exports = {
    create: function createSemaphore(resourceCount) {
        'use strict';
        var lockResource,
            releaseResource,
            semaphore,
            maxResources = 1,
            availableResources = 1;

        if (resourceCount) {
            maxResources = resourceCount;
            availableResources = resourceCount;
        }

        lockResource = function () {
            if (availableResources <= 0) {
                return false;
            } else {
                availableResources -= 1;
                return true;
            }
        };

        releaseResource = function () {
            if (maxResources > availableResources) {
                availableResources += 1;
            }
        };

        semaphore = {
            wait: lockResource,
            signal: releaseResource,
            getInternalState : function () {
                if (availableResources > 0) {
                    return 'Counting semaphore: ' + availableResources + ' available resources';
                }
                return 'Counting semaphore: No available resources';
            }
        };

        return semaphore;
    }
};
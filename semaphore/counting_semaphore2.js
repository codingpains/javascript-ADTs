module.exports = {
    create : function createSemaphore(resourceCount) {
        var lockResource,
            releaseResource,
            semaphore,
            availableResources = [],
            i;

        if (!resourceCount) {
            resourceCount = 1;
        }

        for (i = 0; i < resourceCount; i += 1) {
            availableResources.push(1);
        }

        lockResource = function () {
            if (availableResources.length === 0) {
                return false;
            }
            else {
                availableResources.pop();
                return true;
            }
        };

        releaseResource = function () {
            availableResources.push(1);
        };

        semaphore = {
            wait : lockResource,
            signal : releaseResource
        };

        return semaphore;
    }
};
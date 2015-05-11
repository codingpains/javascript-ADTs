module.exports = {
    create : function createSemaphore(resourceCount) {
        var lockResource,
            releaseResource,
            semaphore,
            availableResources = 1;

        if (resourceCount) {
            availableResources = resourceCount;
        }

        lockResource = function () {
            if (availableResources <= 0) {
                return false;
            }
            else {
                availableResources -= 1;
                return true;
            }
        };

        releaseResource = function () {
            availableResources += 1;
        };

        semaphore = {
            wait : lockResource,
            signal : releaseResource
        };

        return semaphore;
    }
};
module.exports = {
    create : function createSemaphore() {
        var lockResource,
            releaseResource,
            semaphore,
            isResourceBusy = false;

        lockResource = function () {
            if (isResourceBusy === true) {
                return false;
            }
            else {
                isResourceBusy = true;
                return true;
            }
        };

        releaseResource = function () {
            isResourceBusy = false;
        };

        semaphore = {
            wait : lockResource,
            signal : releaseResource
        };

        return semaphore;
    }
};
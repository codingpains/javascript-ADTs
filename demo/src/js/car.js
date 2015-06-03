require('craftyjs');

var moveRight,
    moveDown,
    speed = 6;

moveRight = function () {
    if (this.x > 608) {
        this.x = 0;
        this.loopCount++;
    }

    this.x += speed;
};

moveDown = function () {
    if (this.y > 608) {
        this.y = 0;
        this.loopCount++;
    }

    this.y += speed;
}

Crafty.c('Car', {
    canGo       : null,
    shouldTry   : null,
    loopStarted : false,
    loopCount   : 0,
    semaphore   : 0,

    init : function(args) {
        this.canGo     = false;
        this.shouldTry = true;
        this.loopCount = 0;

        this.requires('2D, Canvas, Color');
    },

    setDirection : function (dir) {
        this.direction = dir;
        return this;
    },

    setSemaphore : function (sem) {
        this.semaphore = sem;
        return this;
    },

    startMoving : function() {
        var car = this;
        if (this.loopStarted === false) {
            this.bind('EnterFrame', function () {
                if (this.loopCount === 4) {
                    this.stop(function () {
                        car.loopCount = 0;
                    });
                }
                else {
                    if (this.canGo) {
                        Crafty.trigger(this.direction + '-go');
                        if (this.direction === 'horizontal') {
                            moveRight.call(this);
                        }
                        else if (this.direction === 'vertical') {
                            moveDown.call(this);
                        }
                    }
                    else if (this.shouldTry && this.semaphore.wait() === true) {
                        Crafty.trigger('semaphore-state', this.semaphore.getInternalState());
                        this.canGo = true;
                    }
                }
            });
            this.loopStarted = true;
        }
    },

    stop : function() {
        if (this.loopStarted === true) {
            var car = this;

            this.canGo     = false;
            this.loopCount = 0;
            this.shouldTry = false;

            this.semaphore.signal();
            Crafty.trigger('semaphore-state', this.semaphore.getInternalState());

            if (this.direction === 'horizontal') {
                this.x = 0;
            }
            else {
                this.y = 0;
            }

            setTimeout(function () {
                car.shouldTry = true;
            }, 1000);
        }
        return this;
    }
});
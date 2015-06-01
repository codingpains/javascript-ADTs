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
    canGo     : null,
    shouldTry : null,
    loopCount : 0,
    semaphore : 0,

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
        this.bind('EnterFrame', function () {
            if (this.loopCount === 4) {
                this.stop();
                this.loopCount = 0;
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
                    this.canGo = true;
                }
            }
        });
    },

    stop : function() {
        var car = this;

        this.canGo     = false;
        this.shouldTry = false;

        this.semaphore.signal();

        setTimeout(function () {
            car.shouldTry = true;
        }, 1000);

        return this;
    }
});
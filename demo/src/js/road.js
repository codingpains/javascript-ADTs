require('craftyjs');
require('./car');
require('./asset_loader');
require('./lib/create_mocks_module');
require('./lib/tiledmapbuilder');

entities = {};

var semaphores = {
        bool  : require('./boolean_semaphore'),
        count : require('./counting_semaphore'),
        arr   : require('./array_semaphore'),
    },
    semaphore = {signal : function() {}},
    mapsrc = require('./citymap.js');

Game = {
    start : function() {
        Crafty.init(608,608, document.getElementById('game'));
        Crafty.scene("SemaphoreDemo");
    }
}

var turnOn = function (light) {
    light.visible = true;
};

var turnOff = function (light) {
    light.visible = false;
};

Crafty.scene('SemaphoreDemo', function () {
    var entityAttrs = {
            car1 : {
                x : 0,
                y : 330,
                z : 3,
                w : 80,
                h : 40 
            },
            car2 : {
                x : 250,
                y : 0,
                z : 3,
                w : 40,
                h : 80
            }
        },
        car1,
        car2,
        mapBuilder;

        mapBuilder = Crafty.e("2D, Canvas, TiledMapBuilder").setMapDataSource(mapsrc);

        mapBuilder.createWorld(function (map){
            var lights = [];

            entities.vStopLights  = mapBuilder.getEntitiesInLayer('v-stop-lights');
            entities.hStopLights  = mapBuilder.getEntitiesInLayer('h-stop-lights');
            entities.vGreenLights = mapBuilder.getEntitiesInLayer('v-green-lights');
            entities.hGreenLights = mapBuilder.getEntitiesInLayer('h-green-lights');
            entities.semaphores   = mapBuilder.getEntitiesInLayer('semaphores');

            lights = entities.vStopLights.concat(entities.hStopLights, entities.vGreenLights, entities.hGreenLights);

            lights.forEach(function (light) {
                light.z = 5;
            });

            entities.semaphores.forEach(function (sem) {
                sem.z = 4;
            });

            Crafty.bind('horizontal-go', function () {
                entities.vStopLights.forEach(turnOn);
                entities.vGreenLights.forEach(turnOff);

                entities.hStopLights.forEach(turnOff);
                entities.hGreenLights.forEach(turnOn);
            });

            Crafty.bind('vertical-go', function () {
                entities.vStopLights.forEach(turnOff);
                entities.vGreenLights.forEach(turnOn);

                entities.hStopLights.forEach(turnOn);
                entities.hGreenLights.forEach(turnOff);
            });

            Crafty.bind('semaphore-change', function(data) {
                console.log('Semaphore change ', data);
                Crafty.pause();
                semaphore.signal();
                semaphore = semaphores[data.type].create();
                
                entities.car1.stop()
                    .setSemaphore(semaphore)
                    .startMoving();

                entities.car2
                    .stop()
                    .setSemaphore(semaphore)
                    .startMoving();

                Crafty.pause();
            });

            car1 = Crafty.e('carH, Car, car_h');
            car1.attr(entityAttrs.car1).setDirection('horizontal');

            car2 = Crafty.e('carV, Car, car_v');
            car2.attr(entityAttrs.car2).setDirection('vertical');

            entities.car1 = car1;
            entities.car2 = car2;
        });
});
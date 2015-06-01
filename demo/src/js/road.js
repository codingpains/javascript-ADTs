require('craftyjs');
require('./car');
require('./asset_loader');
require('./lib/create_mocks_module');
require('./lib/tiledmapbuilder');

entities = {};

var semaphore = require('./boolean_semaphore').create(),
    mapsrc = require('./citymap.js');


Game = {
    start : function() {
        Crafty.init(608,608, document.getElementById('game'));
        Crafty.scene("SemaphoreDemo");
    }
}

Crafty.scene('SemaphoreDemo', function () {
    var entityAttrs = {
            car1 : {
                x : 0,
                y : 330,
                z : 90,
                w : 80,
                h : 40 
            },
            car2 : {
                x : 250,
                y : 0,
                z : 990,
                w : 40,
                h : 80
            }
        },
        car1Attrs = {},
        car2Attrs = {},
        car1,
        car2;

        var mapBuilder = Crafty.e("2D, Canvas, TiledMapBuilder").setMapDataSource(mapsrc);

        mapBuilder.createWorld(function (map){
        });

        car1 = Crafty.e('carH, Car, car_h');
        car1.attr(entityAttrs.car1)
            .setDirection('horizontal')
            .setSemaphore(semaphore)
            .startMoving();

        car2 = Crafty.e('carV, Car, car_v');
        car2.attr(entityAttrs.car2)
            .setDirection('vertical')
            .setSemaphore(semaphore)
            .startMoving();

        entities.car1 = car1;
        entities.car2 = car2;

});
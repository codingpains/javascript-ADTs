var assetsObj = {
    'sprites': {
        'img/yellowcar.png': {
            tile: 176,
            tileh: 98,
            map: {
                car_h: [0, 0]
            }
        },

        'img/greycar.png' : {
            tile : 95,
            tileh : 144,
            map : {
                car_v : [0, 0]
            }
        }
    }
};

Crafty.load(assetsObj, function (err, data) {
    console.log('done', err, data)
});

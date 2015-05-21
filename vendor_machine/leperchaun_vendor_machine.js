// Assume sodas are filled manually, replenishing the sold sodas
// and leaving the unsold ones.

var createVendorMachine = function () {
    'use strict';
    // Values and data structure
    var states  = {
            getting_payment : 0,
            waiting_order   : 1,
            delivering_soda : 2,
            giving_change   : 3
        },
        payment = 0,
        icebox  = {},
        lanes   = 5,
        choices = 0,
        perSoda = 10,
        price   = 300,
        state   = states.getting_payment,
        machine = {};

    // Internal Functions
    var setPrice,
        readPrice,
        readSodaMenu,
        getMoney,
        giveChange,
        fillIcebox,
        getSoda,
        leperchaun = {
            getSoda : function (icebox, sodaName) {
                var ret,
                    index;

                if (icebox[sodaName].length > 0) {
                    index = Math.floor((Math.random() * 10000) % icebox[sodaName].length);
                    ret = icebox[sodaName].splice(index, 1)[0];
                }

                return ret;
            }
        };


    setPrice = function (value) {
        price = value;
    };

    readPrice = function () {
        return price;
    };

    readSodaMenu = function () {
        return Object.keys(icebox);
    };

    fillIcebox = function (sodas) {
        sodas.forEach(function (sodaName) {
            var i = 0;

            if (!icebox[sodaName] && choices >= lanes) {
                console.log(sodaName + ' can not be added');
            } else {
                if (!icebox[sodaName]){
                    icebox[sodaName] = [];
                    choices += 1;
                }

                for (i=0; i < perSoda; i += 1) {
                    icebox[sodaName][i] = sodaName + '-' + i;
                }
            }
        });
    };

    getMoney = function (money) {
        if (!money) {
            return;
        }

        payment += money;
        console.log("Coin inserted " + money/100 + ", total: " + payment/100);
        if (payment >= price) {
            state = states.waiting_order;
        }
    };

    giveChange = function () {
        var change = 0;

        if (payment > price) {
            change = payment - price;
        }

        state = states.getting_payment;

        return change;
    };

    getSoda = function (sodaName) {
        var ret = {};

        if (state === states.waiting_order) {
            state = states.delivering_soda;

            ret.soda = leperchaun.getSoda(icebox, sodaName);

            if (ret.soda) {
                state      = states.giving_change;
                ret.change = giveChange();

                payment = 0;
                state   = states.getting_payment;
            } else {
                console.log('We ran out of ' + sodaName + ', please select other soda');
                state = states.waiting_order;
            }
        } else {
            console.log('You still need to pay $' + (price - payment) + ' more.');
        }

        return ret;
    };

    // Semantics
    machine = {
        readPrice: readPrice,
        setPrice : setPrice,
        readSodaMenu: readSodaMenu,
        fill : fillIcebox,
        insertCoin : getMoney,
        orderSoda : getSoda
    };

    return machine;
};
module.exports = createVendorMachine();
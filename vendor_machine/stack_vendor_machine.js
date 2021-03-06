// Assume sodas are filled manually, replenishing the sold sodas
// and leaving the unsold ones.

var createVendorMachine = function createVendorMachine() {
    'use strict';
    // Values and data structure
    var states  = {
            getting_payment : 0,
            waiting_order   : 1,
            delivering_soda : 2,
            giving_change   : 3
        },
        payment = 0,
        stacks  = {},
        lanes   = 5,
        choices = 0,
        perLane = 8,
        price   = 350,
        state   = states.getting_payment,
        machine = {};

    // Internal Functions
    var setPrice,
        readPrice,
        readSodaMenu,
        getMoney,
        giveChange,
        fillSodasStack,
        getSoda;

    setPrice = function (value) {
        price = value;
    };

    readPrice = function () {
        return price;
    };

    readSodaMenu = function () {
        return Object.keys(stacks);
    };

    fillSodasStack = function (sodas) {
        sodas.forEach(function (sodaName) {
            var i = 0;

            if (!stacks[sodaName] && choices >= lanes) {
                console.log(sodaName + ' can not be added');
            } else {
                if (!stacks[sodaName]){
                    stacks[sodaName] = [];
                    choices += 1;
                }

                for (i=0; i < perLane; i += 1) {
                    stacks[sodaName][i] = sodaName + '-' + i;
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

            if (stacks[sodaName].length > 0) {
                ret.soda = stacks[sodaName].pop();

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
        setPrice : setPrice,
        readPrice: readPrice,
        readSodaMenu: readSodaMenu,
        fill : fillSodasStack,
        insertCoin : getMoney,
        orderSoda : getSoda
    };

    return machine;
};

module.exports = createVendorMachine();
// Assume sodas are filled manually, replenishing the sold sodas
// and leaving the unsold ones.

module.exports = {
    create: function createVendorMachine(data) {
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
            price   = data.price,
            state   = states.getting_payment,
            machine = {};

        // Internal Functions
        var readPrice,
            readSodaMenu,
            getMoney,
            giveChange,
            fillSodasStack,
            getSoda;

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
                        stacks[sodaName][i] = sodaName + i;
                    }
                }
            });
        };

        getMoney = function (money) {
            payment += money;
            if (payment >= price) {
                state = states.waiting_order;
            }
        };

        giveChange = function () {
            var change = 0;
            
            if (state === states.giving_change) {
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
                    
                    if (payment > price) {
                        state = states.giving_change;
                        ret.change = giveChange();
                    }

                    state = states.getting_payment;
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
            readSodaMenu: readSodaMenu,
            fill : fillSodasStack,
            insertCoin : getMoney,
            orderSoda : getSoda
        };

        return machine;
    }
};
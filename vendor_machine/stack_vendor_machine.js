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

        // Semantics
        var readPrice,
            getMoney,
            fillSodasStack,
            getSoda;

        readPrice = function () {
            return price;
        };

        readSodaMenu = function () {
            return Object.keys(sodaStacks);
        };

        fillSodasStack = function (sodas) {
            sodas.forEach(function (sodaName) {
                var i = 0;

                if (!sodaStacks[sodaName] && choices >= lanes) {
                    console.log(sodaName + ' can not be added');
                } else {
                    if (!sodaStacks[sodaName]){
                        choices += 1;
                    }

                    do {
                        sodaStacks[sodaName][i] = sodaName + i;
                    } while (i < perLane);
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
            var change = 0,
                ret;
            
            if (state === states.giving_change) {
                change = money - price;
                ret = 'Your change is ' + change;
            }

            state = states.getting_payment;

            return ret;
        };

        getSoda = function (sodaName) {
            var ret;

            if (state === states.waiting_order) {
                state = states.delivering_soda;

                if (sodaStacks[sodaName].length > 0) {
                    ret = sodaStacks[sodaName].pop();
                    
                    if (money > price) {
                        state = states.giving_change;
                        giveChange();
                    }

                    state = states.getting_payment;
                } else {
                    ret = 'We ran out of ' + sodaName + ', please select other soda';
                    state = states.waiting_order;
                }
            } else {
                ret = 'You still need to pay $' + price - money + ' more'. 
            }
        };

        machine = {
            readPrice: readPrice,
            readSodaMenu: readSodaMenu,
            fillSodasStack : fillSodasStack,
            insertCoin : getMoney,
            orderSoda : getSoda
        };

        return machine;
    }
};
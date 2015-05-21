var machine = require('./stack_vendor_machine'),
//var machine = require('./leperchaun_vendor_machine'),
    coinDenominations = [5, 10, 25, 50, 100],
    sodas = ['Coke', 'Sprite', 'Dr. pepper', 'Diet Coke'];

machine.setPrice(375);
machine.fill(sodas);

function purchase() {
    var money = 0,
        availableSodas = machine.readSodaMenu(),
        soda,
        coin,
        res = {};

    // Pay
    while(money < machine.readPrice()) {
        coin = coinDenominations[Math.round(Math.random() * 100) % coinDenominations.length];
        money += coin;
        machine.insertCoin(coin);
    }

    while(!res.soda) {
        soda = availableSodas[Math.round(Math.random() * 100) % availableSodas.length];
        console.log("You asked for " + soda);
        res = machine.orderSoda(soda);
    }

    if (res.soda) {
        console.log("You get " + res.soda);
    }
    console.log("You paid " + money/100);
    console.log("Price is " + machine.readPrice()/100);
    if (res.change) {
        console.log("Your change is " + (res.change === 0 ? 0 : res.change/100), res.change);
    }
};

for (var i = 1; i <= 30; i++) {
    console.log("\nCustomer " + i);
    purchase();
}

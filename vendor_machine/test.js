var machine = require('./stack_vendor_machine').create({ price : 375 }),
    coinDenominations = [5, 10, 25, 50, 100],
    sodas = ['Coke', 'Sprite', 'Dr. pepper', 'Diet Coke'];

machine.fill(sodas);

function purchase1() {
    var money = 0,
        availableSodas = machine.readSodaMenu(),
        soda = availableSodas[Math.round(Math.random() * 100) % availableSodas.length],
        coin,
        res;

    // Pay
    while(money < machine.readPrice()) {
        coin = coinDenominations[Math.round(Math.random() * 100) % coinDenominations.length];
        money += coin;
        console.log("Coin ", coin/100);
        console.log("Money ", money/100);

        machine.insertCoin(coin);
    }

    res = machine.orderSoda(soda);
    console.log("You asked for " + soda);
    console.log("You get " + res.soda);
    console.log("You paid " + money/100);
    console.log("Price is " + machine.readPrice()/100);
    console.log("Your change is " + res.change/100);
};

purchase1();
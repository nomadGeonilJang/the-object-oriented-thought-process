{
    type CoffeeCup = {
        shots:number;
        hasMilk:boolean;
    }

    const BEANS_GRAMM_PER_SHOT = 7;
    let coffeeBeans = 0;
    function makeCoffee(shots:number):CoffeeCup {

        const needBeans = shots * BEANS_GRAMM_PER_SHOT;

        if(coffeeBeans < needBeans){
            throw new Error('Not Enough coffe beans!');
        }

        coffeeBeans -= needBeans;

        return {
            shots,
            hasMilk:false
        }


    }

    coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;


    const coffee = makeCoffee(2);
    console.log(coffee);


}
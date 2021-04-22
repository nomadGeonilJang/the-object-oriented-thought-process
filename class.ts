{
    type CoffeeCup = {
        shots:number;
        hasMilk:boolean;
    }

    class CoffeeMaker{
        static BEANS_GRAMM_PER_SHOT = 7; // class lavel -  상수로 사용할 것은 static으로 정으해서 고통 적으로 사용하는게 좋다.
        coffeeBeans = 0; // instance (object) level

        constructor(coffeeBeans:number){
            this.coffeeBeans = coffeeBeans;
        }

        static makeMachine(coffeeBeans:number):CoffeeMaker{
            return new CoffeeMaker(coffeeBeans);
        }



        makeCoffee(shots:number):CoffeeCup {
    
            const needBeans = shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
    
            if(this.coffeeBeans < needBeans){
                throw new Error('Not Enough coffe beans!');
            }
    
           this. coffeeBeans -= needBeans;
    
            return {
                shots,
                hasMilk:false
            }
    
    
        }
    }


    const maker = new CoffeeMaker(32);
    console.log(maker)
    const coffee = maker.makeCoffee(2);
    console.log(coffee)


    const maker3 = CoffeeMaker.makeMachine(3);
    console.log(maker3)

}
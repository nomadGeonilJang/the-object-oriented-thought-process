{
    type CoffeeCup = {
        shots:number;
        hasMilk:boolean;
    }

    // public
    // private
    // protected
    class CoffeeMaker{
        private static BEANS_GRAMM_PER_SHOT = 7; // class lavel -  상수로 사용할 것은 static으로 정으해서 고통 적으로 사용하는게 좋다.
        private coffeeBeans = 0; // instance (object) level

        private constructor(coffeeBeans:number){
            this.coffeeBeans = coffeeBeans;
        }

        static makeMachine(coffeeBeans:number):CoffeeMaker{
            return new CoffeeMaker(coffeeBeans);
        }

        fillCoffeeBeas(beans:number){
            if(beans < 0){
                throw new Error("value for beans should be greather than 0");
            }
            this.coffeeBeans += beans;
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


    const maker = CoffeeMaker.makeMachine(32);
    maker.fillCoffeeBeas(44);
    console.log(maker)
    
    // maker.coffeeBeans = -44 invalid



    class User {

        get fullName():string{
            return  `${this.firstName} ${this.lastName}`
        }
        private internalAge = 4;
        get age():number{
            return this.internalAge
        }
        set age(num:number){
            this.internalAge = num;
        }
        constructor(private firstName:string, private lastName:string){}
    }

    const user = new User("gi", 'jang');
    console.log(user.fullName)
    
    
    

}

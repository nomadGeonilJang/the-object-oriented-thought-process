{
    type CoffeeCup = {
        shots:number;
        hasMilk:boolean;
    }


    interface CoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
    }

    interface CommercialCoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
        fillCoffeeBeans(beans:number):void;
        clean():void;
    }
    // public
    // private
    // protected
    class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker{
        private static BEANS_GRAMM_PER_SHOT = 7; // class lavel -  상수로 사용할 것은 static으로 정으해서 고통 적으로 사용하는게 좋다.
        private coffeeBeans = 0; // instance (object) level

        private constructor(coffeeBeans:number){
            this.coffeeBeans = coffeeBeans;
        }

    
        clean(): void {
            console.log('cleaning the machine....')
        }
   

        static makeMachine(coffeeBeans:number):CoffeeMachine{
            return new CoffeeMachine(coffeeBeans);
        }

        fillCoffeeBeans(beans:number){
            if(beans < 0){
                throw new Error("value for beans should be greather than 0");
            }
            this.coffeeBeans += beans;
        }

        private grindBeans(shots:number){
            console.log(`grinding beans for ${shots}`);
            if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
                throw new Error('Not enough coffee beas!');
            }
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
        }
        
        private preheat(){
            console.log('heating up... 🔥');
        }

        private extract(shots:number){
            console.log(`Pulling ${shots}...`);
            return {
                shots,
                hasMilk:false
            }
        }

        makeCoffee(shots:number):CoffeeCup {

            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
    
        }
    }


  


    class AmateureUser{
        constructor(private machine:CoffeeMaker){}
        makeCoffee(){
            const coffee = this.machine.makeCoffee(2);
            console.log(coffee)
        }
    }
    
    class ProBarista{
        constructor(private machine:CommercialCoffeeMaker){}
        makeCoffee(){
            const coffee = this.machine.makeCoffee(2);
            console.log(coffee)
            this.machine.fillCoffeeBeans(55);
            this.machine.clean();
        }
    }

    const maker:CoffeeMachine = CoffeeMachine.makeMachine(32);
    
    const amateure = new AmateureUser(maker);
    const pro = new ProBarista(maker)

    amateure.makeCoffee();
    pro.makeCoffee();


    
    
    
}




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

    class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker{
        private static BEANS_GRAMM_PER_SHOT = 7; 
        private coffeeBeans = 0; 

        constructor(coffeeBeans:number){
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



    class CaffeLatterMachine  extends CoffeeMachine{
        constructor(beans:number,public readonly serialNumber:string){
            super(beans);

        }
        private steamMilk(){
            console.log('Steaminig some.. milk')
        }
        makeCoffee(shots:number):CoffeeCup{
            const coffee = super.makeCoffee(shots)
            this.steamMilk();
            return {
                ...coffee,
                hasMilk:true
            }
        }
    }


    const machine = new CoffeeMachine(23);
    const latteMachine = new CaffeLatterMachine(23, 'LCMS');
    const coffee = latteMachine.makeCoffee(2);
    console.log(coffee)
  



  


    
    
    
}




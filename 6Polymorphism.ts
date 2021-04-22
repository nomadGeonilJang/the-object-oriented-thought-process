{
    type CoffeeCup = {
        shots:number;
        hasMilk?:boolean;
        hasSuger?:boolean;
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

    class SweetCoffeeMaker extends CoffeeMachine{
        makeCoffee(){
            const coffee = super.makeCoffee(2);
            return {
                ...coffee,
                hasSuger:true
            }
        }
    }


    const machines : CoffeeMaker[]= [
        new CoffeeMachine(16),
        new CaffeLatterMachine(16,"la"),
        new SweetCoffeeMaker(16),
        new CoffeeMachine(16),
        new CaffeLatterMachine(16,"la"),
        new SweetCoffeeMaker(16)
    ]

    machines.forEach(machine => {
        console.log(`--------------`)
        machine.makeCoffee(1);
    })

}




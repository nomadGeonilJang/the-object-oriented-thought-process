{
    type CoffeeCup = {
        shots:number;
        hasMilk?:boolean;
        hasSuger?:boolean;
    }

    interface CoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
    }

    // 
    class CheapMilkSteamer{
        private steamMlik():void{
            console.log('Steaming some milk....');
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMlik();
            return{
                ...cup,
                hasMilk:true,
            }
        }
    }
    //
    class AutomaticSugarMixer{
        private getSugar(){
            console.log('Getting some suger from candy!');
            return true
        }
        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSuger:sugar
            }
        }
    }




    class CoffeeMachine implements CoffeeMaker{
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
        constructor(
            beans:number,
            public readonly serialNumber:string,
            private milkFother:CheapMilkSteamer
        ){
            super(beans);
        }
   
        makeCoffee(shots:number):CoffeeCup{
            const coffee = super.makeCoffee(shots)
            return this.milkFother.makeMilk(coffee)   
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine{

        constructor(
            shots:number,
            private sugar: AutomaticSugarMixer
        ){
            super(shots)
        }

        makeCoffee(){
            const coffee = super.makeCoffee(2);
            return this.sugar.addSugar(coffee)
        }
    }

    class SweetCaffeLatteMachine extends CoffeeMachine{
        constructor(
            private beans:number,
            private sugar:AutomaticSugarMixer,
            private milk:CheapMilkSteamer,
        ){
            super(beans)
        }

        makeCoffee(shots:number){
            const coffee = super.makeCoffee(shots);
            const sugarAdded = this.sugar.addSugar(coffee)
            return this.milk.makeMilk(sugarAdded);
        }
    }


    const machines : CoffeeMaker[]= [
        new CoffeeMachine(16),
        new CaffeLatterMachine(16,"la", new CheapMilkSteamer()),
        new SweetCoffeeMaker(16, new AutomaticSugarMixer()),
        new SweetCaffeLatteMachine(16, new AutomaticSugarMixer(), new CheapMilkSteamer())
    ]

    machines.forEach(machine => {
        console.log(`--------------`)
        const coffee = machine.makeCoffee(1)
        console.log(coffee)
    })

}




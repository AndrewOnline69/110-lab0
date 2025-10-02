/*This file is to create the base structure of our Lemonade Stand Game.

This game is to keep track of how much money the player has made during
the runtime of the program. The game also will keep track of the inventory
the player has and how each weather affects the outcome of the Lemonade Stand

*/
const { createInterface } = require("readline");

//Initialize the inventory count to 0
class Inventory{
    lemons: number = 0;
    cups: number = 0;
    sugar: number = 0;
    ice: number = 0;
}

class LemonadeStand{
    inventory:Inventory;
    cash:number;

    constructor(initialCash:number){
        this.inventory = new Inventory();
        this.cash = initialCash;
    }

    //Code for buying the supplies needed
    buySupplies(prices: any, purchases:any){
        const cost = purchases.lemons * prices.lemons +
                    purchases.cups * prices.cups +
                    purchases.sugar * prices.sugar +
                    purchases.ice * prices.ice;
        
        //Fail check if cash is less than cost
        if(cost > this.cash){
            console.log("Not Enough Money!! You're Broke!!!");
            return false;
        }

        //Updates the cash and inventory with items bought
        this.cash -= cost;
        this.inventory.lemons += purchases.lemons;
        this.inventory.sugar += purchases.sugar;
        this.inventory.cups += purchases.cups;
        this.inventory.ice += purchases.ice;

        
        return true;
    }

    //Displays the Status of Inventory/Cash
    displayStatus(){
        console.log("===Current Inventory===");
        console.log(`Current Cash: $${this.cash.toFixed(2)}`);
        console.log(`Lemons: ${this.inventory.lemons}`);
        console.log(`Sugar: ${this.inventory.sugar}`);
        console.log(`Cups: ${this.inventory.cups}`);
        console.log(`Ice Cubes: ${this.inventory.ice}`);
        console.log("======================");
    }


    //Code to simulate the current day
    simulateDay(weather: string, prices: any){
        //Weather code and how it affects demand
        let demand = 0;
        if(weather == "hot") demand = 15;

        else if(weather == "cloudy") demand = 4;

        else if(weather == "cold") demand = 2;

        else demand = 10;
    
        //Lemonade Recipe
        let maxPossible = Math.min(
            Number(this.inventory.lemons),
            Number(this.inventory.sugar),
            Number(this.inventory.ice),
            Number(this.inventory.cups)
        );

        //Determines how much is sold and how much cash is made
        const sold = Math.min(demand, maxPossible);
        this.cash += sold * 1.25;
        this.cash = Number(this.cash.toFixed(2));//Rounds Cash to 2 Decimals
        
        //Reduce Inventory
        this.inventory.lemons -= sold;
        this.inventory.cups -= sold;
        this.inventory.sugar -= sold;
        this.inventory.ice -= sold;

        console.log(`You have sold ${sold} lemonade today. Your Lemonade Stand has $${this.cash} dollars`);
    }    
}

//Game Loop Code
const r1 = createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Question Helper Function
async function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    r1.question(question, (answer) => {
      resolve(answer);
    });
  });
}

const stand = new LemonadeStand(20);

async function runDay(day: number){
    //Weather Code
    const weather = ["hot", "cold", "cloudy", "warm"][Math.floor(Math.random() * 4)]; //Random Weather Code
    console.log(`-----Day: ${day}-----`);
    console.log(`Today's Weather: ${weather}`);
    
    //Price Code
    const prices = {
        lemons: +(0.25 + Math.random()).toFixed(2),
        sugar: +(0.20 + Math.random()).toFixed(2),
        cups: +(0.05 + Math.random()).toFixed(2),
        ice: +(0.03 + Math.random()).toFixed(2),
    }    
    stand.displayStatus();
    console.log("Today's Prices: " , prices);

    //Question Purchases for the Lemonade Stand
    async function getPurchases(){
        const lemons = await askQuestion("How many Lemons to buy?");
        const sugar = await askQuestion("How many Sugar to buy?");
        const cups = await askQuestion("How many Cups to buy?");
        const ice = await askQuestion("How many Ice to Buy?");

        return{
            lemons: Number(lemons) || 0,
            sugar: Number(sugar) || 0,
            cups: Number(cups) || 0,
            ice: Number(ice) || 0,
        };    
    }

    //Purchases
    const purchases = await getPurchases();
    console.log("Purchases: ", purchases);

    stand.buySupplies(prices, purchases);
    
    stand.simulateDay(weather, prices);

    //Day Counter Code
    if(day < 5){
        await runDay(day + 1);
    }

    else{
        console.log("Game Over!!!");
        console.log("End Cash: ", stand.cash);
        r1.close();
    }
}
    
//Run Game
(async() => {
    console.log("Game is Starting...")
    await runDay(1);
})();
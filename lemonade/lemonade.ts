/*This file is to create the base structure of our Lemonade Stand Game.

This game is to keep track of how much money the player has made during
the runtime of the program. The game also will keep track of the inventory
the player has and how each weather affects the outcome of the Lemonade Stand

*/

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
            console.log("Not Enough Money!! You're Broke!!!!");
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
    
    //Code to simulate the current day
    simulateDay(weather: string, prices: any){
        //Weather code and how it affects demand
        let demand = 0;
        if(weather == "heatwave") demand = 50;

        else if(weather == "cloudy") demand = 15;

        else if(weather == "cold") demand = 5;

        else demand = 25;
    
        //Lemonade Recipe
        let maxPossible = Math.min;(
            this.inventory.lemons,
            this.inventory.sugar,
            Math.floor(this.inventory.ice / 3),
            this.inventory.cups
        );

        
    }


    
}
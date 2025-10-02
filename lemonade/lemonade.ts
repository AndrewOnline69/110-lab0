/*This file is to create the base structure of our Lemonade Stand Game.

This game is to keep track of how much money the player has made during
the runtime of the program. The game also will keep track of the inventory
the player has and how each weather affects the outcome of the Lemonade Stand

*/

import { cpus } from "os";
import * as readline from "readline"

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
    
    //Code to simulate the current day
    simulateDay(weather: string, prices: any){
        //Weather code and how it affects demand
        let demand = 0;
        if(weather == "hot") demand = 50;

        else if(weather == "cloudy") demand = 15;

        else if(weather == "cold") demand = 5;

        else demand = 25;
    
        //Lemonade Recipe
        let maxPossible = Math.min;(
            this.inventory.lemons,
            this.inventory.sugar,
            this.inventory.ice / 3,
            this.inventory.cups
        );

        //Determines how much is sold and how much cash is made
        const sold = Math.min(demand, maxPossible); //Fix Later
        this.cash += sold * 1.0;
        
        //Reduce Inventory
        this.inventory.lemons -= sold;
        this.inventory.cups -= sold;
        this.inventory.sugar -= sold;
        this.inventory.ice -= sold * 3;

        console.log('Weather: ${weather}. You have sold ${sold} lemonade today. Your Lemonade Stand has earned $${cash} dollars');
    }    
}

//Game Loop Code
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const stand = new LemonadeStand(20);

function runDay(day: number){
    const weather = ["hot", "cold", "cloudy", "warm"][Math.floor(Math.random() * 4)]; //Random Weather Code

    const prices = {
        lemons: 0.6 * Math.random(),
        cups: 0.14 * Math.random(),
        sugar: 0.25 * Math.random(),
        ice: 0.08 * Math.random(),
    }    

    console.log("Day: ${day}");
    console.log("Weather: ${weather}");
    console.log("Prices: ," , prices);

    //Question Purchases for the Lemonade Stand
    r1.question("How much Lemons, Sugar, Ice, and Cups do you want to buy? Enter Each Value:", (answer) =>{
        const parts = answer.split(",").map((n) => parseInt(n));
        const purchases = {
            lemons: parts[0] || 0,
            sugar: parts[1] || 0,
            ice: parts[2] || 0,
            cups: parts[3] || 0,
        };
     
        stand.buySupplies(prices, purchases);
        stand.simulateDay(weather, prices);
        
        //Counts amount of days
        if(day < 5) runDay(day + 1);
        else if(day = 100){
            console.log("Congrats Your Business has Thrived!!!");
            console.log("Final Cash: ", stand.cash);
        }
        else{
            console.log("Game Over!!! Business has Failed!!!");
            console.log("Final Cash: ", stand.cash);
        } 
    })
}
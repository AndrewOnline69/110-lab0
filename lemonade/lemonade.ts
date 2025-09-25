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
}
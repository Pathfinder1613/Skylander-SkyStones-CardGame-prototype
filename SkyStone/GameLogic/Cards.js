import { renderStones } from './renderCrads.js';

export class Skystone {
    constructor(name, attack, ability = "None", img = "/img/Dragon.jpg") {
        this.name = name;
        this.attack = attack;
        this.img = img;
        this.ability = ability
    }
}

export class SkystonesGame {
    constructor() {
        this.currentPlayer = 0;
        this.players = [
            {
                name: "Player 1",
                stones: [
                    new Skystone("Chompy", 5, "test", './img/Chompy.jpg'),
                    new Skystone("Troll", 6, "test", './img/Troll.jpg'),
                    new Skystone("Sheep", 4, "heal", './img/Sheep.jpg'),
                    new Skystone("Dragon", 7, "test", './img/Dragon.jpg')
                ]
            },
            {
                name: "Player 2",
                stones: [
                    new Skystone("Cyclops", 7, "Double Attack" ,'./img/Chompy.jpg'),
                    new Skystone("Gremlin", 5, "test", './img/Chompy.jpg'),
                    new Skystone("Mabu", 4, "test", './img/Chompy.jpg'),
                    new Skystone("Goblin", 6, "test", './img/Chompy.jpg')
                ]
            }
        ];
    }

    switchTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % 2;  
        // re render crads
        renderStones(this)
        
    }
}

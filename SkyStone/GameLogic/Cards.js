import { renderStones } from './renderCrads.js';

export class Skystone {
    constructor(name, attack, img = "/img/Dragon.jpg") {
        this.name = name;
        this.attack = attack;
        this.img = img;
    }
}

export class SkystonesGame {
    constructor() {
        this.currentPlayer = 0;
        this.players = [
            {
                name: "Player 1",
                stones: [
                    new Skystone("Chompy", 5, './img/Chompy.jpg'),
                    new Skystone("Troll", 6, './img/Troll.jpg'),
                    new Skystone("Sheep", 4, './img/Sheep.jpg'),
                    new Skystone("Dragon", 7, './img/Dragon.jpg')
                ]
            },
            {
                name: "Player 2",
                stones: [
                    new Skystone("Cyclops", 7, './img/Chompy.jpg'),
                    new Skystone("Gremlin", 5, './img/Chompy.jpg'),
                    new Skystone("Mabu", 4, './img/Chompy.jpg'),
                    new Skystone("Goblin", 6, './img/Chompy.jpg')
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

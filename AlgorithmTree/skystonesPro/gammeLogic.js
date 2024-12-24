class Skystone {
    constructor(name, attack, defense, health) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
    }

    // Method to attack an opponent's stone
    attack(opponent) {
        if (!(opponent instanceof Skystone)) {
            throw new Error("Opponent must be an instance of Skystone.");
        }
        let damage = Math.max(0, this.attack - opponent.defense);  // Calculate damage
        opponent.health -= damage; // Reduce opponent's health

        // If the opponent's stone is defeated (health <= 0), return the result
        if (opponent.health <= 0) {
            return `${this.name} defeats ${opponent.name}! ${opponent.name} is removed from the grid.`;
        } else {
            return `${this.name} attacks ${opponent.name} for ${damage} damage. ${opponent.name} has ${opponent.health} health left.`;
        }
    }
}


class SkystonesGame {
    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.players = [
            { name: "Player 1", stones: [
                new Skystone("Chompy", 5, 3, 10),
                new Skystone("Troll", 6, 4, 12),
                new Skystone("Sheep", 4, 2, 8),
                new Skystone("ffff", 4, 2, 8)
            ]},
            { name: "Player 2", stones: [
                new Skystone("Cyclops", 7, 5, 15),
                new Skystone("Gremlin", 5, 3, 9),
                new Skystone("Mabu", 4, 2, 7),
                new Skystone("ffff", 4, 2, 8)
            ]}
        ];
        this.currentPlayerIndex = 0; // Start with Player 1
        this.turnElement = document.getElementById("turn");
        this.boardElement = document.getElementById("board");
        this.alertElement = document.getElementById("alert");

        // Initialize the turn display
        this.updateTurnDisplay();
    }

    // Get the current player
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    // Switch turns between players
    switchTurns() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;  // Switch between 0 and 1
        this.updateTurnDisplay();
    }

    // Update the turn display
    updateTurnDisplay() {
        const player = this.getCurrentPlayer();
        this.turnElement.textContent = `It's ${player.name}'s turn!`;
        this.turnElement.className = this.currentPlayerIndex === 0 ? 'player1' : 'player2';
    }

    // Handle a click on a cell (place a stone)
    handleCellClick(row, col) {
        const currentPlayer = this.getCurrentPlayer();
        if (currentPlayer.stones.length === 0) {
            alert(`${currentPlayer.name} has no stones left.`);
            return;
        }
    
        // Ensure the clicked cell is empty
        if (this.board[row][col] !== null) {
            alert("This cell is already taken!");
            return;
        }
    
        // Get the next stone and place it on the board
        const stone = currentPlayer.stones.pop(); // Get the next stone from the player's deck
        this.board[row][col] = stone;
    
        // Update the UI to show the stone
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = `${stone.name} (${stone.health} HP)`;
        cell.classList.add('taken');
    
        // Perform attacks on adjacent stones
        this.attackAdjacentStones(row, col);
    
        // After placing the stone, switch turns
        this.switchTurns();
    
        // Check if the game is over
        if (this.isGameOver()) {
            this.endGame();
        }
    }
    

    // Attack adjacent stones on the board
    attackAdjacentStones(row, col) {
        const currentStone = this.board[row][col]; // The stone placed by the current player
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1] // Up, Down, Left, Right
        ];
    
        directions.forEach(([rOffset, cOffset]) => {
            const r = row + rOffset;
            const c = col + cOffset;
    
            // Ensure the adjacent cell is valid
            if (r >= 0 && r < 3 && c >= 0 && c < 3) {
                const adjacentStone = this.board[r][c]; // The stone in the adjacent cell
                if (adjacentStone && adjacentStone !== currentStone) {
                    // Ensure the adjacent stone is an instance of Skystone
                    if (adjacentStone instanceof Skystone) {
                        // Perform the attack
                        const result = currentStone.attack(adjacentStone);
                        this.updateAttackMessage(result);
    
                        // If the adjacent stone is defeated, remove it from the grid
                        if (adjacentStone.health <= 0) {
                            this.board[r][c] = null;
                            const adjacentCell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                            adjacentCell.textContent = '';
                            adjacentCell.classList.remove('taken');
                        }
                    } else {
                        console.error("Adjacent cell does not contain a Skystone.");
                    }
                }
            }
        });
    }
    

    // Display attack result in the alert
    updateAttackMessage(message) {
        this.alertElement.textContent = message;
    }

    // Check if the board is full
    isBoardFull() {
        return this.board.every(row => row.every(cell => cell !== null));
    }

    // End the game
    endGame() {
        alert("Game Over!");
        // Display the result
        let player1Stones = this.players[0].stones.filter(stone => stone.health > 0).length;
        let player2Stones = this.players[1].stones.filter(stone => stone.health > 0).length;

        if (player1Stones > player2Stones) {
            alert("Player 1 wins!");
        } else if (player2Stones > player1Stones) {
            alert("Player 2 wins!");
        } else {
            alert("It's a tie!");
        }
    }
}

// Initialize the game
const game = new SkystonesGame();

// Add click event listeners for each cell in the grid
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        game.handleCellClick(row, col);
    });
});

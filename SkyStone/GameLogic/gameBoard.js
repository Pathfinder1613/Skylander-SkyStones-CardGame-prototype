// import { SkystonesGame } from './Cards.js';
// const game = new SkystonesGame();
var currentSelectedCard = null;

function captureStonesWithTree(box, game, placedCard) {
    const boxes = document.querySelectorAll('.box');
    const visited = new Set(); 
    const gridSize = 3; 

    function captureRecursive(currentBox) {
        
        const adjacentBoxes = getAdjacentBoxes(currentBox, boxes, gridSize);

        adjacentBoxes.forEach((adjacentBox) => {
            if (!visited.has(adjacentBox) && adjacentBox.classList.contains('occupied')) {
                const adjacentCardData = JSON.parse(adjacentBox.getAttribute('data-card'));
                const adjacentOwner = adjacentBox.getAttribute('data-owner');

                
                if (placedCard.attack > adjacentCardData.attack) {
                  
                    adjacentBox.setAttribute('data-owner', game.currentPlayer);
                    adjacentBox.querySelector('.card-content').style.borderColor = 
                        game.currentPlayer === 0 ? 'blue' : 'red';

                    const console = document.getElementById('console');
                    console.textContent = `${placedCard.name} captures ${adjacentCardData.name}!`;

                 
                    visited.add(adjacentBox);

                   
                    captureRecursive(adjacentBox);
                }
            }
        });
    }
    captureRecursive(box);
}



function getAdjacentBoxes(currentBox, boxes, gridSize) {
    const position = parseInt(currentBox.getAttribute('data-position'));

    const adjacentIndices = [
        position - 1, // left
        position + 1, // right
        position - gridSize, // above
        position + gridSize // below
    ];

    return adjacentIndices
        .filter((index) => index >= 0 && index < boxes.length) 
        .filter((index) => {
            if ((position % gridSize === 0 && index === position - 1) || 
                ((position + 1) % gridSize === 0 && index === position + 1)) {
                return false;
            }
            return true;
        })
        .map((index) => boxes[index]); 
}


function applyAbility(ability, game, selectedCard, box) {
    switch (ability) {
        case 'doubleAttack':
            selectedCard.attack *= 2;
            break;
        case 'heal':
            game.players[game.currentPlayer].stones.forEach(stone => {
                stone.attack += 1; // Example: Heal increases attack by 1
            });
            break;
        // Add more abilities as needed
        default:
            console.log(`Ability ${ability} not recognized.`);
    }
}


export function addBoxClickListener(game) {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach((box) => {
        box.addEventListener('click', () => {




            if (box.classList.contains('occupied')) {
                const consoleElement = document.getElementById('console');
                consoleElement.textContent = "This spot is already occupied!";
                return;
            }

            if (currentSelectedCard) {
                const currentPlayer = game.players[game.currentPlayer];
                const selectedCard = currentPlayer.stones.find(
                    (stone) => stone.name === currentSelectedCard
                );

                if (!selectedCard) {
                    const console = document.getElementById('console');
                    console.textContent = "Invalid card selection!";
                    return;
                }

                if (selectedCard.ability) {
                    applyAbility(selectedCard.ability, game, selectedCard, box);
                }

                
                box.innerHTML = `
                    <div class="card-content">
                        <img src="${selectedCard.img}" alt="${selectedCard.name}" class="card-image">
                        <p class="card-name">${selectedCard.name} attack:${selectedCard.attack}</p>
                    </div>
                `;
                box.classList.add('occupied');
                box.setAttribute('data-card', JSON.stringify(selectedCard));
                box.setAttribute('data-owner', game.currentPlayer);

                
                currentPlayer.stones = currentPlayer.stones.filter(
                    (stone) => stone.name !== currentSelectedCard
                );

                captureStonesWithTree(box, game, selectedCard);

                currentSelectedCard = null;

                
                game.switchTurn();
                updateTurnDisplay(game);
            } else {
                const console = document.getElementById('console');
                console.textContent = "No card selected yet.";
            }
        
        });
    });
}



export function addCardSelectionListener() {
    const cardElements = document.querySelectorAll('.card');

    cardElements.forEach((card) => {
        card.addEventListener('click', () => {
            currentSelectedCard = card.querySelector('h4').textContent; 
            const console = document.getElementById('console');
            console.textContent = `Selected Card: ${currentSelectedCard}`;
            
            
        });
    });
}
function updateTurnDisplay(game) {
    const turnDisplay = document.getElementById('turn-display');  
    turnDisplay.textContent = `It's ${game.players[game.currentPlayer].name}'s turn`;
    const console = document.getElementById('console');
            console.textContent = `Waiting for action`
}


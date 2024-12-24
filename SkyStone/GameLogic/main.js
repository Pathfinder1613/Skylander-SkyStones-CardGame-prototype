
import { SkystonesGame } from './Cards.js';
import { renderStones } from './renderCrads.js';
import { addBoxClickListener, addCardSelectionListener } from './gameBoard.js';


const game = new SkystonesGame();



document.addEventListener('DOMContentLoaded', () => {
    renderStones(game);
    addCardSelectionListener(game);
    addBoxClickListener(game);
});




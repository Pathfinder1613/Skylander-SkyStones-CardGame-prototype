import { addCardSelectionListener } from './gameBoard.js';

export function renderStones(game, currentPlayerTurn) {
    const PlayerHand = document.getElementById('Player-Hand');
    PlayerHand.innerHTML = '';

    const isGameBoardPage = window.location.pathname.includes('game-Board.html');

    game.players.forEach((player, index) => {
        if (isGameBoardPage && index !== currentPlayerTurn) return; // Skip rendering if it's not the current player's turn on game-Board.html

        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        const playerName = document.createElement("h2");
        playerName.textContent = `${player.name}'s Skystones`;
        playerDiv.appendChild(playerName);

        player.stones.forEach((stone) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = stone.img;
            img.alt = stone.name;
            card.appendChild(img);

            const name = document.createElement("h4");
            name.textContent = stone.name;
            card.appendChild(name);

            const stats = document.createElement("p");
            stats.textContent = `Attack: ${stone.attack}`;
            card.appendChild(stats);

            playerDiv.appendChild(card);
        });

        PlayerHand.appendChild(playerDiv);
    });

    addCardSelectionListener();
}
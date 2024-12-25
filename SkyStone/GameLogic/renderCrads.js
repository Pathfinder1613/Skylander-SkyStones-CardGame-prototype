
import { addCardSelectionListener } from './gameBoard.js';

export function renderStones(game) {
    const PlayerHand = document.getElementById('Player-Hand');
    PlayerHand.innerHTML = '';

       const currentPlayer = game.players[game.currentPlayer];

        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        const playerName = document.createElement("h2");
        playerName.textContent = `${currentPlayer.name}'s Skystones`;
        playerDiv.appendChild(playerName);

        currentPlayer.stones.forEach((stone) => {
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

            const ability = document.createElement('p');
            ability.textContent = `Ability: ${stone.ability}`;
            ability.classList.add('card-ability'); // Optional CSS for styling
            card.appendChild(ability);

            playerDiv.appendChild(card);
        });

        PlayerHand.appendChild(playerDiv);

        addCardSelectionListener()
    };

 
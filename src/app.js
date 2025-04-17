import { showConfirmModal } from "./components/confirm-modal.js";
import { createRoleSetupModal } from "./components/roles-setup-modal.js";
import { createPlayersSetupModal } from "./components/players-setup-modal.js";
import { PlayerCard } from "./components/player-card.js";
import {
    saveGameSetup,
    loadGameSetup,
    savePlayers,
    loadPlayers,
    saveGameState,
    loadGameState,
} from "./utils/storage.js";
import { roles } from "./data/roles.js";

let players = loadPlayers(); // Load players from localStorage
let rolesSetup = loadGameSetup(); // Load roles setup from localStorage
let gameState = loadGameState(); // Load game state from localStorage

const updateNewGameButtonState = () => {
    const errorContainer = document.getElementById("setup-error");
    const totalRoles = Object.values(rolesSetup)
        .map((count) => Number(count))
        .reduce((sum, count) => sum + count, 0);

    if (players.length === 0) {
        errorContainer.textContent = "Add players to start the game.";
        errorContainer.classList.remove("d-none");
        return;
    }

    if (totalRoles === 0) {
        errorContainer.textContent = "Select roles to start the game.";
        errorContainer.classList.remove("d-none");
        return;
    }

    if (players.length !== totalRoles) {
        errorContainer.textContent =
            "The number of players must match the number of roles.";
        errorContainer.classList.remove("d-none");
        return;
    }

    errorContainer.textContent = "";
    errorContainer.classList.add("d-none");
};

const assignRolesToPlayers = (rolesSetup, players) => {
    const assignedRoles = [];

    // Convert the roles setup into a flat list of roles
    Object.entries(rolesSetup).forEach(([roleId, count]) => {
        const role = roles.find((r) => r.id === Number(roleId));
        for (let i = 0; i < count; i++) {
            assignedRoles.push(role);
        }
    });

    // Shuffle the roles to randomize the assignment
    for (let i = assignedRoles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [assignedRoles[i], assignedRoles[j]] = [
            assignedRoles[j],
            assignedRoles[i],
        ];
    }

    // Assign roles to players
    return players.map((playerName, index) => ({
        name: playerName,
        role: assignedRoles[index],
        isProtected: false,
        isEliminated: false,
    }));
};

const startGame = () => {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Clear the container

    let assignedPlayers;

    // Use the saved game state if it exists
    if (gameState && gameState.players && gameState.players.length > 0) {
        assignedPlayers = gameState.players;
    } else {
        // Assign roles to players if no game state exists
        assignedPlayers = assignRolesToPlayers(rolesSetup, players);

        // Save the new game state
        gameState = { players: assignedPlayers };
        saveGameState(gameState);
    }

    // Render player cards
    assignedPlayers.forEach((player) => {
        const playerCard = new PlayerCard({
            name: player.name,
            role: player.role,
            isProtected: player.isProtected,
            isEliminated: player.isEliminated,
            onProtect: (isProtected) => {
                player.isProtected = isProtected;
                saveGameState(gameState); // Save the updated game state
            },
            onEliminate: (isEliminated) => {
                player.isEliminated = isEliminated;
                saveGameState(gameState); // Save the updated game state
            },
        });

        gameContainer.appendChild(playerCard.render());
    });
};

function initApp() {
    document.querySelector("#app").innerHTML = `
    <div class="container my-4">
      <h1 class="mb-4">Werewolf Moderator</h1>
      <div class="d-inline-flex gap-2 mb-3">
        <button id="newgame-btn" class="btn btn-secondary">New Game</button>
        <button id="setup-players-btn" class="btn btn-primary">Players</button>
        <button id="setup-roles-btn" class="btn btn-primary">Roles</button>
      </div>
      <div id="setup-error" class="text-danger d-none"></div>
      <div id="game-container" class="row gy-1"></div>
    </div>
  `;

    document.getElementById("newgame-btn").addEventListener("click", () => {
        const totalRoles = Object.values(rolesSetup)
            .map((count) => Number(count))
            .reduce((sum, count) => sum + count, 0);

        if (
            players.length === 0 ||
            totalRoles === 0 ||
            players.length !== totalRoles
        ) {
            updateNewGameButtonState(); // Show the error message
        } else {
            // Check if a game is already running
            if (
                gameState &&
                gameState.players &&
                gameState.players.length > 0
            ) {
                // Show confirmation modal if a game is already running
                showConfirmModal({
                    title: "New Game",
                    message:
                        "Are you sure you want to start a new game? The current game will be lost.",
                    onConfirm: () => {
                        gameState = null; // Clear the current game state
                        startGame(); // Start a new game
                    },
                });
            } else {
                // Start the game directly if no game is running
                startGame();
            }
        }
    });

    document
        .getElementById("setup-players-btn")
        .addEventListener("click", () => {
            const totalRoles = Object.values(rolesSetup)
                .map((count) => Number(count))
                .reduce((sum, count) => sum + count, 0);

            const modal = createPlayersSetupModal(
                players,
                totalRoles,
                (updatedPlayers) => {
                    players = updatedPlayers; // Update the global players list
                    savePlayers(players); // Save to localStorage
                    updateNewGameButtonState();
                }
            );
            document.body.appendChild(modal);
        });

    document.getElementById("setup-roles-btn").addEventListener("click", () => {
        const modal = createRoleSetupModal(rolesSetup, (updatedRolesSetup) => {
            rolesSetup = updatedRolesSetup; // Update the global rolesSetup
            saveGameSetup(rolesSetup); // Save to localStorage
            updateNewGameButtonState();
        });
        document.body.appendChild(modal);
    });

    // If a game state exists, load it
    if (gameState && gameState.players && gameState.players.length > 0) {
        startGame();
    }

    updateNewGameButtonState();
}

export { initApp };

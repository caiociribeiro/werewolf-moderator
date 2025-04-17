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

    Object.entries(rolesSetup).forEach(([roleId, count]) => {
        const role = roles.find((r) => r.id === Number(roleId));
        for (let i = 0; i < count; i++) {
            assignedRoles.push(role);
        }
    });

    for (let i = assignedRoles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [assignedRoles[i], assignedRoles[j]] = [
            assignedRoles[j],
            assignedRoles[i],
        ];
    }

    return players.map((playerName, index) => ({
        name: playerName,
        role: assignedRoles[index],
        isProtected: false,
        isEliminated: false,
    }));
};

const updateScores = () => {
    const wolvesAlive = gameState.players.filter(
        (player) => player.role.team === "wolves" && !player.isEliminated
    ).length;

    const villagersAlive = gameState.players.filter(
        (player) => player.role.team === "village" && !player.isEliminated
    ).length;

    document.getElementById("wolves-label").textContent = "Wolves";
    document.getElementById("villagers-label").textContent = "Village";

    const wolvesScoreElement = document.getElementById("wolves-count");
    const villagersScoreElement = document.getElementById("villagers-count");

    wolvesScoreElement.textContent = `${wolvesAlive}`;
    villagersScoreElement.textContent = `${villagersAlive}`;
};

const startGame = () => {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";

    let assignedPlayers;

    if (gameState && gameState.players && gameState.players.length > 0) {
        assignedPlayers = gameState.players;
    } else {
        assignedPlayers = assignRolesToPlayers(rolesSetup, players);

        gameState = { players: assignedPlayers };
        saveGameState(gameState);
    }

    assignedPlayers.forEach((player) => {
        const playerCard = new PlayerCard({
            name: player.name,
            role: player.role,
            isProtected: player.isProtected,
            isEliminated: player.isEliminated,
            onProtect: (isProtected) => {
                player.isProtected = isProtected;
                saveGameState(gameState);
                updateScores();
            },
            onEliminate: (isEliminated) => {
                player.isEliminated = isEliminated;
                saveGameState(gameState);
                updateScores();
            },
        });

        gameContainer.appendChild(playerCard.render());
    });

    updateScores();
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
      <div id="scores-container" class="d-flex justify-content-center my-3">
        <div id="scores" class="d-flex flex-column">
            <div id="wolves-score" class="d-flex justify-content-between gap-4">
               <div id="wolves-label" class="text-start"></div> 
               <div id="wolves-count" class="text-end"></div>
            </div>
            <div id="villagers-score" class="d-flex justify-content-between gap-4">
               <div id="villagers-label" class="text-start"></div> 
               <div id="villagers-count" class="text-end"></div>
            </div>
        </div>
      </div>
      <div id="game-container" class="row px-4 justify-content-center"></div>
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
            updateNewGameButtonState();
        } else {
            if (
                gameState &&
                gameState.players &&
                gameState.players.length > 0
            ) {
                showConfirmModal({
                    title: "New Game",
                    message:
                        "Are you sure you want to start a new game? The current game will be lost.",
                    cancelLabel: "Cancel",
                    confirmLabel: "Start New Game",
                    onConfirm: () => {
                        gameState = null;
                        startGame();
                    },
                });
            } else {
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
                    players = updatedPlayers;
                    savePlayers(players);
                    updateNewGameButtonState();
                }
            );
            document.body.appendChild(modal);
        });

    document.getElementById("setup-roles-btn").addEventListener("click", () => {
        const modal = createRoleSetupModal(rolesSetup, (updatedRolesSetup) => {
            rolesSetup = updatedRolesSetup;
            saveGameSetup(rolesSetup);
            updateNewGameButtonState();
        });
        document.body.appendChild(modal);
    });

    if (gameState && gameState.players && gameState.players.length > 0) {
        startGame();
    }

    updateNewGameButtonState();
}

export { initApp };

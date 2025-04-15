import { roles } from "./data/roles.js";
import { PlayerCard } from "./components/player-card.js";
import { showConfirmModal } from "./components/confirm-modal.js";

// Funções para manipular o estado do jogo no localStorage
const GAME_STATE_KEY = "werewolfGameState";

function saveGameState() {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(players));
}

function loadGameState() {
    const gameStateStr = localStorage.getItem(GAME_STATE_KEY);
    if (gameStateStr) {
        try {
            return JSON.parse(gameStateStr);
        } catch (e) {
            console.error("Erro ao ler o game state:", e);
        }
    }
    return null;
}

function clearGameState() {
    localStorage.removeItem(GAME_STATE_KEY);
}

let players = [];

function processPlayersInput(input) {
    return input
        .split(";")
        .map((name) => name.trim())
        .filter((name) => name.length > 0);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function assignRoles(playersArray) {
    const count = playersArray.length;
    const config = roles[count];
    if (!config) {
        alert(
            `Número de jogadores inválido. São permitidos de 10 a 19 jogadores.`
        );
        return [];
    }
    const rolesForGame = shuffleArray([...config]);
    return playersArray.map((name, index) => ({
        name,
        role: rolesForGame[index],
        isProtected: false,
    }));
}

function createPlayerCard(player) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-6";
    const card = new PlayerCard({
        name:
            player.name.charAt(0).toUpperCase() +
            player.name.slice(1).toLowerCase(),
        role: player.role,
        isProtected: player.isProtected,
        onKill: () => {
            alert(`O jogador ${player.name} foi eliminado.`);
            // Lógica adicional se desejar
        },
        onProtect: (status) => {
            console.log(`${player.name} proteção: ${status}`);
            // Lógica adicional se necessário
        },
    }).render();
    col.appendChild(card);
    return col;
}

function renderPlayersCards(playersArray) {
    const container = document.getElementById("playersContainer");
    container.innerHTML = "";
    playersArray.forEach((player) =>
        container.appendChild(createPlayerCard(player))
    );
}

function startGame() {
    const inputField = document.getElementById("playersInput");
    const namesArray = processPlayersInput(inputField.value);
    if (namesArray.length === 0) {
        alert("Nenhum nome válido foi inserido.");
        return;
    }
    players = assignRoles(namesArray);
    if (players.length > 0) {
        renderPlayersCards(players);
        saveGameState();
    }
}

function resetGame() {
    players = [];
    document.getElementById("playersInput").value = "";
    document.getElementById("playersContainer").innerHTML = "";
    clearGameState(); // Remove o estado salvo do localStorage
}

function newDraw() {
    if (players.length === 0) {
        alert("Nenhum jogador foi definido. Inicie o jogo primeiro.");
        return;
    }
    const namesArray = players.map((p) => p.name);
    players = assignRoles(namesArray);
    renderPlayersCards(players);
    saveGameState(); // Salva o novo sorteio no localStorage
}

export function initApp() {
    document.querySelector("#app").innerHTML = `
    <div class="container my-4">
      <h1 class="mb-4">Werewolf Moderator</h1>
      <div class="mb-3">
        <input type="text" id="playersInput" class="form-control" placeholder="Ex: caio;jorge;clara;tobias">
        <div class="form-text">Separe os nomes por ponto e vírgula ( ; )</div>
      </div>
      <div class="d-inline-flex gap-1 mb-3">
        <button id="startGameBtn" class="btn btn-secondary  me-2">New Game</button>
        <button id="newDrawBtn" class="btn btn-secondary me-2">New Roles</button>
        <button id="resetGameBtn" class="btn btn-secondary">Reset</button>
      </div>
      <div id="playersContainer" class="row gy-1"></div>
    </div>
  `;

    document
        .getElementById("startGameBtn")
        .addEventListener("click", startGame);
    document.getElementById("resetGameBtn").addEventListener("click", () => {
        showConfirmModal({
            title: "Reset Game",
            message: "Tem certeza que deseja resetar o jogo?",
            onConfirm: () => {
                resetGame();
            },
        });
    });
    document.getElementById("newDrawBtn").addEventListener("click", () => {
        showConfirmModal({
            title: "New Roles",
            message: "Tem certeza que deseja redistribuir os papeis?",
            onConfirm: () => {
                newDraw();
            },
        });
    });

    // Se houver um jogo salvo, carrega-o
    const savedPlayers = loadGameState();
    if (savedPlayers && savedPlayers.length > 0) {
        players = savedPlayers;
        renderPlayersCards(players);
    }
}

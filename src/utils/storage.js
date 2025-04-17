const GAME_SETUP_KEY = "roles-setup";
const PLAYERS_KEY = "players-list";
const GAME_STATE_KEY = "game-state";

/**
 * Salva o setup de roles no localStorage.
 * @param {Object} rolesSetup - O objeto rolesSetup para salvar.
 */
export const saveGameSetup = (rolesSetup) => {
    try {
        localStorage.setItem(GAME_SETUP_KEY, JSON.stringify(rolesSetup));
    } catch (error) {
        console.error("Failed to save game setup:", error);
    }
};

/**
 * Carrega o setup de roles do localStorage.
 * @returns {Object} O objeto rolesSetup, ou um objeto vazio se não encontrado.
 */
export const loadGameSetup = () => {
    try {
        const setupStr = localStorage.getItem(GAME_SETUP_KEY);
        return setupStr ? JSON.parse(setupStr) : {};
    } catch (error) {
        console.error("Failed to load game setup:", error);
        return {};
    }
};

/**
 * Salva a lista de jogadores no localStorage.
 * @param {Array} players - A lista de jogadores a salvar.
 */
export const savePlayers = (players) => {
    try {
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    } catch (error) {
        console.error("Failed to save players:", error);
    }
};

/**
 * Carrega a lista de jogadores do localStorage.
 * @returns {Array} A lista de jogadores, ou um array vazio se não encontrado.
 */
export const loadPlayers = () => {
    try {
        const playersStr = localStorage.getItem(PLAYERS_KEY);
        return playersStr ? JSON.parse(playersStr) : [];
    } catch (error) {
        console.error("Failed to load players:", error);
        return [];
    }
};

/**
 * Salva o estado do jogo no localStorage.
 * @param {Object} gameState - O estado do jogo a salvar.
 */
export const saveGameState = (gameState) => {
    try {
        localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    } catch (error) {
        console.error("Failed to save game state:", error);
    }
};

/**
 * Carrega o estado do jogo do localStorage.
 * @returns {Object} O estado do jogo, ou um objeto vazio se não encontrado.
 */
export const loadGameState = () => {
    try {
        const gameStateStr = localStorage.getItem(GAME_STATE_KEY);
        return gameStateStr ? JSON.parse(gameStateStr) : {};
    } catch (error) {
        console.error("Failed to load game state:", error);
        return {};
    }
};

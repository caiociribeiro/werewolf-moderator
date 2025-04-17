const GAME_SETUP_KEY = "roles-setup";
const PLAYERS_KEY = "players-list";
const GAME_STATE_KEY = "game-state";

/**
 * Save the roles setup to localStorage.
 * @param {Object} rolesSetup - The roles setup object to save.
 */
export const saveGameSetup = (rolesSetup) => {
    try {
        localStorage.setItem(GAME_SETUP_KEY, JSON.stringify(rolesSetup));
    } catch (error) {
        console.error("Failed to save game setup:", error);
    }
};

/**
 * Load the roles setup from localStorage.
 * @returns {Object} The roles setup object, or an empty object if not found.
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
 * Save the players list to localStorage.
 * @param {Array} players - The list of players to save.
 */
export const savePlayers = (players) => {
    try {
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    } catch (error) {
        console.error("Failed to save players:", error);
    }
};

/**
 * Load the players list from localStorage.
 * @returns {Array} The list of players, or an empty array if not found.
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
 * Save the game state to localStorage.
 * @param {Object} gameState - The current game state to save.
 */
export const saveGameState = (gameState) => {
    try {
        localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    } catch (error) {
        console.error("Failed to save game state:", error);
    }
};

/**
 * Load the game state from localStorage.
 * @returns {Object} The game state, or an empty object if not found.
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

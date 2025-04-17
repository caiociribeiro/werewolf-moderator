export const createPlayersSetupModal = (currentPlayers, maxPlayers, onSave) => {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "players-setup-modal";
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "players-setup-modal-label");
    modal.setAttribute("aria-hidden", "true");

    let players = [...currentPlayers];

    const updatePlayerList = () => {
        const playersList = modal.querySelector("#players-list");
        playersList.innerHTML = ""; // Clear the list

        players.forEach((player, index) => {
            const playerContainer = document.createElement("div");
            playerContainer.className =
                "d-flex justify-content-between align-items-center mb-2";

            const playerName = document.createElement("span");
            playerName.textContent = player;
            playerName.className = "text-capitalize";

            const removeButton = document.createElement("button");
            removeButton.className = "btn btn-outline-danger btn-sm";
            removeButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

            removeButton.addEventListener("click", () => {
                players.splice(index, 1);
                updatePlayerList();
            });

            playerContainer.appendChild(playerName);
            playerContainer.appendChild(removeButton);
            playersList.appendChild(playerContainer);
        });

        const addButton = modal.querySelector("#add-player-btn");
        addButton.disabled = players.length >= maxPlayers;

        const playerCountDisplay = modal.querySelector("#player-count-display");
        playerCountDisplay.textContent = `${players.length} of ${maxPlayers} added`;
    };

    modal.innerHTML = `
        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h1 class="modal-title fs-5" id="players-setup-modal-label">Setup Players</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <div class="input-group">
                            <input type="text" id="player-name-input" class="form-control" placeholder="Enter player name" />
                            <button id="add-player-btn" class="btn btn-primary">Add</button>
                        </div>
                        <small id="player-count-display" class="text-muted">${players.length} of ${maxPlayers} added</small>
                    </div>
                    <div id="players-list" class="d-flex flex-column gap-2"></div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="save-players-btn">Save</button>
                </div>
            </div>
        </div>
    `;

    modal.querySelector("#add-player-btn").addEventListener("click", () => {
        const input = modal.querySelector("#player-name-input");
        const playerName = input.value.trim();

        if (playerName && players.length < maxPlayers) {
            players.push(playerName);
            input.value = "";
            updatePlayerList();
        }
    });

    modal.querySelector("#save-players-btn").addEventListener("click", () => {
        if (typeof onSave === "function") {
            onSave(players);
        }
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
    });

    modal.addEventListener("show.bs.modal", () => {
        updatePlayerList();
    });

    document.body.appendChild(modal);

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    return modal;
};

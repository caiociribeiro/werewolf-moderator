/**
 *
 * @param {Object} player
 * @param {string} player.playerName - Nome do jogador.
 * @param {Object} player.role - Role do jogador.
 * @param {string} player.role.name - Cor da role.
 * @param {function} player.onProtect - Função chamada ao proteger o jogador.
 * @param {function} player.onEliminate - Função chamada ao eliminar o jogador.
 */

export const showPlayerStatusModal = ({
    player,
    eliminateIcon,
    eliminateLabel,
    protectLabel,
    onProtect,
    onEliminate,
}) => {
    const existingModal = document.getElementById("player-status-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "player-status-modal";
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "player-status-modal-label");

    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="player-status-modal-label">${player.name} - ${player.role.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <button class="btn btn-outline-danger" id="eliminate-btn">
                        <i class="${eliminateIcon}"></i> ${eliminateLabel}
                    </button>
                    <button class="btn btn-outline-info" id="protect-btn">
                        <i class="fa-solid fa-shield-alt"></i> ${protectLabel}
                    </button>
                </div>
            </div>
        </div>
    `;

    const eliminateBtn = modal.querySelector("#eliminate-btn");
    const protectBtn = modal.querySelector("#protect-btn");

    eliminateBtn.addEventListener("click", () => {
        if (typeof onEliminate === "function") {
            onEliminate();
        }
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
            bootstrapModal.hide();
        }
    });

    protectBtn.addEventListener("click", () => {
        if (typeof onProtect === "function") {
            onProtect();
        }
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
            bootstrapModal.hide();
        }
    });

    document.body.appendChild(modal);

    const bootstrapModal = new bootstrap.Modal(modal, {
        keyboard: true,
    });

    bootstrapModal.show();

    modal.addEventListener("shown.bs.modal", () => {
        protectBtn.focus();
    });

    modal.addEventListener("hidden.bs.modal", () => {
        modal.remove(); // Remove the modal from the DOM after it is hidden
    });
};

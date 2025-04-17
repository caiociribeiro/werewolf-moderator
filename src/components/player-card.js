import { showPlayerStatusModal } from "./player-status-modal.js";

export class PlayerCard {
    /**
     * @param {Object} player
     * @param {string} player.name - Nome do player.
     * @param {Object} player.role - Role do player.
     * @param {string} player.role.name - Nome da role.
     * @param {string} player.role.color - String que representa o tipo de cor da role (bootstrap).
     * @param {boolean} [player.isProtected=false] - Estado de proteção do player.
     * @param {boolean} [player.isEliminated=false] - Estado de eliminação do player.
     * @param {Function} [player.onEliminate] - Callback para ação de eliminação.
     * @param {Function} [player.onProtect] - Callback para ação de proteção.
     */
    constructor({
        name,
        role,
        isProtected = false,
        isEliminated = false,
        onEliminate,
        onProtect,
    }) {
        this.name = name;
        this.role = role;
        this.isProtected = isProtected;
        this.isEliminated = isEliminated;
        this.onEliminate = onEliminate;
        this.onProtect = onProtect;
    }

    render() {
        const card = document.createElement("div");
        card.className = `card m-2 p-0 bg-${this.role.color}-subtle col-12`;
        card.style.cursor = "pointer";
        card.style.maxWidth = "20rem";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body card-sm row";

        const infoSection = document.createElement("div");
        infoSection.className =
            "col d-flex flex-column justify-content-center p-2";

        const name = document.createElement("div");
        name.className = "text-capitalize fs-6 text-center";
        name.textContent = this.name;
        infoSection.appendChild(name);

        const role = document.createElement("h2");
        role.className = "text-nowrap text-center m-0 text-capitalize";
        role.textContent = this.role.name;
        infoSection.appendChild(role);

        const statusIconContainer = document.createElement("div");
        statusIconContainer.className = "d-flex justify-content-end";

        const statusIcon = document.createElement("i");
        const protectIcon = "fa-solid fa-shield-alt text-info invisible";
        const eliminateIcon = "fas fa-skull-crossbones text-danger invisible";
        statusIcon.className = protectIcon;

        statusIconContainer.appendChild(statusIcon);

        cardBody.appendChild(infoSection);
        cardBody.appendChild(statusIconContainer);
        card.appendChild(cardBody);

        const updateCardStatus = () => {
            card.classList.toggle("border-info", this.isProtected);
            card.classList.toggle("border-danger", this.isEliminated);

            statusIcon.className = this.isProtected
                ? protectIcon
                : eliminateIcon;
            statusIcon.classList.toggle(
                "invisible",
                !this.isProtected && !this.isEliminated
            );
        };

        card.addEventListener("click", () => {
            showPlayerStatusModal({
                player: this,
                onProtect: () => {
                    if (this.isEliminated) return;
                    this.isProtected = !this.isProtected;
                    if (this.isProtected) this.isEliminated = false;
                    if (typeof this.onProtect === "function") {
                        this.onProtect(this.isProtected);
                    }
                    updateCardStatus();
                },
                onEliminate: () => {
                    if (this.isProtected) return;
                    this.isEliminated = !this.isEliminated;
                    if (this.isEliminated) this.isProtected = false;
                    if (typeof this.onEliminate === "function") {
                        this.onEliminate(this.isEliminated);
                    }
                    updateCardStatus();
                },
            });
        });

        updateCardStatus();

        return card;
    }
}

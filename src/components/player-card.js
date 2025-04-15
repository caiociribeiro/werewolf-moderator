import { roleColors } from "../data/roleColors.js";

export class PlayerCard {
    /**
     * @param {Object} player
     * @param {string} player.name - Nome do jogador.
     * @param {string} player.role - Role do jogador.
     * @param {boolean} [player.isProtected=false] - Estado de proteção.
     * @param {boolean} [player.isEliminated=false] - Estado de eliminação.
     * @param {Function} [player.onEliminate] - Callback para a ação de eliminação.
     * @param {Function} [player.onProtect] - Callback para a ação de proteger.
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
        const roleColor = roleColors[this.role];
        card.className = `card mb-3 p-0 ${roleColor}`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body row";

        const infoSection = document.createElement("div");
        infoSection.className =
            "col d-flex flex-column justify-content-center p-2";

        const name = document.createElement("div");
        name.className = "text-capitalize fs-6 text-start";
        name.textContent = this.name;
        infoSection.appendChild(name);

        const role = document.createElement("h3");
        role.className = "text-nowrap text-start m-0";
        role.textContent = this.role;
        infoSection.appendChild(role);

        const buttonSection = document.createElement("div");
        buttonSection.className = "col d-flex justify-content-end";

        const buttonContainer = document.createElement("div");
        buttonContainer.className =
            "d-flex flex-column justify-content-center gap-2";

        const protectBtn = document.createElement("button");
        protectBtn.className = "btn btn-outline-info";
        const shieldIcon = document.createElement("i");
        shieldIcon.className = "fas fa-shield-alt";
        protectBtn.appendChild(shieldIcon);

        const eliminateBtn = document.createElement("button");
        eliminateBtn.className = "btn btn-outline-danger";
        const eliminateIcon = document.createElement("i");
        eliminateIcon.className = "fa-solid fa-skull-crossbones";
        eliminateBtn.appendChild(eliminateIcon);

        buttonContainer.appendChild(protectBtn);
        buttonContainer.appendChild(eliminateBtn);

        buttonSection.appendChild(buttonContainer);

        cardBody.appendChild(infoSection);
        cardBody.appendChild(buttonSection);
        card.appendChild(cardBody);

        const toggleProtect = (e) => {
            e.preventDefault();

            if (this.isEliminated) return;

            this.isProtected = !this.isProtected;
            protectBtn.className = this.isProtected
                ? "btn btn-info"
                : "btn btn-outline-info";
            card.classList.toggle("border-info");
            protectBtn.offsetHeight;
            if (typeof this.onProtect === "function") {
                this.onProtect(this.isProtected);
            }
        };

        const toggleEliminate = (e) => {
            e.preventDefault();

            if (this.isProtected) return;

            this.isEliminated = !this.isEliminated;
            eliminateBtn.className = this.isEliminated
                ? "btn btn-danger"
                : "btn btn-outline-danger";

            card.classList.toggle("border-danger");
            eliminateBtn.offsetHeight;
            if (typeof this.onEliminate === "function") {
                this.onEliminate();
            }
        };

        eliminateBtn.addEventListener("click", toggleEliminate);
        eliminateBtn.addEventListener("touchend", toggleEliminate);

        protectBtn.addEventListener("click", toggleProtect);
        protectBtn.addEventListener("touchend", toggleProtect);

        return card;
    }
}

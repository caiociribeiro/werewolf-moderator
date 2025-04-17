export class PlayerCard {
    /**
     * @param {Object} player
     * @param {string} player.name - Name of the player.
     * @param {Object} player.role - Role object of the player.
     * @param {string} player.role.name - Name of the role.
     * @param {string} player.role.color - Color of the role.
     * @param {boolean} [player.isProtected=false] - Protection state.
     * @param {boolean} [player.isEliminated=false] - Elimination state.
     * @param {Function} [player.onEliminate] - Callback for elimination action.
     * @param {Function} [player.onProtect] - Callback for protection action.
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
        card.className = `card mb-3 p-0 ${this.role.color}`;

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
        role.className = "text-nowrap text-start m-0 text-capitalize";
        role.textContent = this.role.name;
        infoSection.appendChild(role);

        const buttonSection = document.createElement("div");
        buttonSection.className = "col d-flex justify-content-end";

        const buttonContainer = document.createElement("div");
        buttonContainer.className =
            "d-flex flex-column justify-content-center gap-2";

        const protectBtn = document.createElement("button");
        protectBtn.className = this.isProtected
            ? "btn btn-info"
            : "btn btn-outline-info";
        const shieldIcon = document.createElement("i");
        shieldIcon.className = "fas fa-shield-alt";
        protectBtn.appendChild(shieldIcon);

        const eliminateBtn = document.createElement("button");
        eliminateBtn.className = this.isEliminated
            ? "btn btn-danger"
            : "btn btn-outline-danger";
        const eliminateIcon = document.createElement("i");
        eliminateIcon.className = "fa-solid fa-skull-crossbones";
        eliminateBtn.appendChild(eliminateIcon);

        buttonContainer.appendChild(protectBtn);
        buttonContainer.appendChild(eliminateBtn);

        buttonSection.appendChild(buttonContainer);

        cardBody.appendChild(infoSection);
        cardBody.appendChild(buttonSection);
        card.appendChild(cardBody);

        const forceReflow = (element) => {
            // Force a reflow to ensure styles are applied immediately
            element.offsetHeight;
        };

        const toggleProtect = (e) => {
            e.preventDefault();

            if (this.isEliminated) return;

            this.isProtected = !this.isProtected;
            protectBtn.className = this.isProtected
                ? "btn btn-info"
                : "btn btn-outline-info";
            forceReflow(protectBtn); // Force reflow for mobile compatibility
            card.classList.toggle("border-info");
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
            forceReflow(eliminateBtn); // Force reflow for mobile compatibility
            card.classList.toggle("border-danger");
            if (typeof this.onEliminate === "function") {
                this.onEliminate(this.isEliminated);
            }
        };

        eliminateBtn.addEventListener("click", toggleEliminate);
        protectBtn.addEventListener("click", toggleProtect);

        return card;
    }
}

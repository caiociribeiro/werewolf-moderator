export function showConfirmModal({ title, message, onConfirm }) {
    const existingModal = document.getElementById("customConfirmModal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.id = "customConfirmModal";
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = 1000;

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#1e1e1e";
    modalContent.style.color = "#f1f1f1";
    modalContent.style.padding = "2rem";
    modalContent.style.borderRadius = "10px";
    modalContent.style.maxWidth = "400px";
    modalContent.style.width = "90%";
    modalContent.style.textAlign = "center";

    const titleEl = document.createElement("h5");
    titleEl.innerText = title;
    titleEl.style.marginBottom = "1rem";

    const messageEl = document.createElement("p");
    messageEl.innerText = message;
    messageEl.style.marginBottom = "1.5rem";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.justifyContent = "space-between";
    buttonsContainer.style.gap = "1rem";

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancelar";
    cancelBtn.style.flex = 1;
    cancelBtn.style.padding = "0.5rem 1rem";
    cancelBtn.style.backgroundColor = "#444";
    cancelBtn.style.color = "#fff";
    cancelBtn.style.border = "none";
    cancelBtn.style.borderRadius = "5px";
    cancelBtn.style.cursor = "pointer";

    const confirmBtn = document.createElement("button");
    confirmBtn.innerText = "Confirmar";
    confirmBtn.style.flex = 1;
    confirmBtn.style.padding = "0.5rem 1rem";
    confirmBtn.style.backgroundColor = "#28a745";
    confirmBtn.style.color = "#fff";
    confirmBtn.style.border = "none";
    confirmBtn.style.borderRadius = "5px";
    confirmBtn.style.cursor = "pointer";

    cancelBtn.addEventListener("click", () => modal.remove());
    confirmBtn.addEventListener("click", () => {
        onConfirm();
        modal.remove();
    });

    buttonsContainer.appendChild(cancelBtn);
    buttonsContainer.appendChild(confirmBtn);

    modalContent.appendChild(titleEl);
    modalContent.appendChild(messageEl);
    modalContent.appendChild(buttonsContainer);
    modal.appendChild(modalContent);

    const container = document.getElementById("app") || document.body;
    container.appendChild(modal);
}

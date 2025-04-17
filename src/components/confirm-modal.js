export const showConfirmModal = ({
    title,
    message,
    cancelLabel,
    confirmLabel,
    onConfirm,
}) => {
    const existingModal = document.getElementById("confirm-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "confirm-modal";
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "confirm-modal-label");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="confirm-modal-label">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${cancelLabel}</button>
                    <button type="button" class="btn btn-primary" id="confirm-btn">${confirmLabel}</button>
                </div>
            </div>
        </div>
    `;

    modal.querySelector("#confirm-btn").addEventListener("click", () => {
        if (typeof onConfirm === "function") {
            onConfirm();
        }
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
            bootstrapModal.hide();
        }
    });

    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    modal.addEventListener("hidden.bs.modal", () => {
        modal.remove();
    });
};

export function showConfirmModal({ title, message, onConfirm }) {
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
                <div class="modal-header">
                    <h5 class="modal-title" id="confirm-modal-label">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="confirm-btn">Confirm</button>
                </div>
            </div>
        </div>
    `;

    // Add event listener for the Confirm button
    modal.querySelector("#confirm-btn").addEventListener("click", () => {
        if (typeof onConfirm === "function") {
            onConfirm(); // Execute the callback
        }
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
            bootstrapModal.hide(); // Hide the modal
        }
    });

    // Append the modal to the body and show it
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Remove the modal from the DOM after it is hidden
    modal.addEventListener("hidden.bs.modal", () => {
        modal.remove();
    });
}

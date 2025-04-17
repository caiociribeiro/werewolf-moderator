import { roles } from "../data/roles.js";

export const createRoleSetupModal = (currentRolesSetup, onSave) => {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "roles-setup-modal";
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "roles-setup-modal-label");
    modal.setAttribute("aria-hidden", "true");

    let rolesSetup = { ...currentRolesSetup };
    roles.forEach((role) => {
        const roleId = String(role.id);
        if (typeof rolesSetup[roleId] !== "number") {
            rolesSetup[roleId] = 0;
        }
    });

    const updateTotalRoles = () => {
        const totalRoles = Object.values(rolesSetup)
            .map((count) => Number(count))
            .reduce((sum, count) => sum + count, 0);

        const totalRolesElement = modal.querySelector("#total-roles-selected");
        if (totalRolesElement) {
            totalRolesElement.textContent = `${totalRoles} roles selected`;
        }
    };

    const rebuildRolesList = () => {
        const rolesList = modal.querySelector("#roles-list");
        rolesList.innerHTML = "";

        roles.forEach((role) => {
            const roleId = String(role.id);
            const color = role.color.split("-")[1];

            const roleContainer = document.createElement("div");
            roleContainer.className = "d-flex align-items-center gap-2";

            const roleButton = document.createElement("button");
            roleButton.className = `btn btn-${color} text-bg-${color} me-2 d-flex justify-content-between align-items-center flex-grow-1 text-capitalize role-btn`;
            roleButton.innerHTML = `
                ${role.name}
                <span class="badge fs-6 text-bg-${color}">${rolesSetup[roleId]}</span>
            `;

            roleButton.addEventListener("click", () => {
                rolesSetup[roleId] += 1;
                const badge = roleButton.querySelector(".badge");
                badge.textContent = rolesSetup[roleId];
                updateTotalRoles();
            });

            const removeButton = document.createElement("button");
            removeButton.className = "btn btn-outline-danger btn-sm";
            removeButton.innerHTML = `<i class="fa-solid fa-minus"></i>`;

            removeButton.addEventListener("click", () => {
                if (rolesSetup[roleId] == 0) return;

                rolesSetup[roleId] -= 1;
                const badge = roleButton.querySelector(".badge");
                badge.textContent = rolesSetup[roleId];
                updateTotalRoles();
            });

            const clearButton = document.createElement("button");
            clearButton.className = "btn btn-outline-danger btn-sm";
            clearButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

            clearButton.addEventListener("click", () => {
                rolesSetup[roleId] = 0; // Reset to 0
                const badge = roleButton.querySelector(".badge");
                badge.textContent = rolesSetup[roleId];
                updateTotalRoles();
            });

            roleContainer.appendChild(roleButton);
            roleContainer.appendChild(removeButton);
            roleContainer.appendChild(clearButton);
            rolesList.appendChild(roleContainer);
        });
    };

    modal.innerHTML = `
        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h1 class="modal-title fs-5" id="roles-setup-modal-label">Select Roles</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="roles-list" class="d-flex flex-column gap-3"></div>
                </div>
                <div class="modal-footer border-0">
                    <span id="total-roles-selected" class="me-auto">Total Roles Selected: 0</span>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="save-roles-btn">Save</button>
                </div>
            </div>
        </div>
    `;

    modal.querySelector("#save-roles-btn").addEventListener("click", () => {
        if (typeof onSave === "function") {
            onSave(rolesSetup);
        }
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
    });

    modal.addEventListener("show.bs.modal", () => {
        rebuildRolesList();
        updateTotalRoles();
    });

    document.body.appendChild(modal);

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    return modal;
};

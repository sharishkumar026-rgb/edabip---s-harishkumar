
// ============================================
// EDABIP — LOGIN UI MANAGEMENT
// File: js/ui.js
// ============================================

/**
 * Find an element safely by ID.
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * Display an individual field validation error.
 * Supports #emailError and #passwordError.
 * @param {"email"|"password"} field
 * @param {string} message
 */
export function showFieldError(field, message = "") {
    const errorElement = getElement(`${field}Error`);
    const inputElement = getElement(field);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.hidden = !message;
    }

    if (inputElement) {
        if (message) {
            inputElement.setAttribute("aria-invalid", "true");
        } else {
            inputElement.removeAttribute("aria-invalid");
        }
    }
}

/**
 * Display email and password validation errors.
 * @param {{email?: string, password?: string}} errors
 */
export function showValidationErrors(errors = {}) {
    showFieldError("email", errors.email || "");
    showFieldError("password", errors.password || "");
}

/**
 * Display a general login status message.
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
export function showFormMessage(message, type = "info") {
    const messageElement = getElement("formMessage");

    if (!messageElement) {
        if (message) {
            console.info(`[EDABIP ${type}] ${message}`);
        }
        return;
    }

    messageElement.textContent = message;
    messageElement.hidden = !message;
    messageElement.classList.remove(
        "success",
        "error",
        "info",
        "message-success",
        "message-error",
        "message-info"
    );

    if (message) {
        messageElement.classList.add(type);
        messageElement.setAttribute("role", type === "error" ? "alert" : "status");
        messageElement.setAttribute("aria-live", "polite");
    }
}

/**
 * Update the login button's loading state.
 * @param {boolean} isLoading
 */
export function setLoginLoading(isLoading) {
    const button = getElement("loginButton");

    if (!button) {
        return;
    }

    button.disabled = isLoading;
    button.setAttribute("aria-busy", String(isLoading));

    const buttonText = button.querySelector(".button-text");

    if (buttonText) {
        if (!buttonText.dataset.originalText) {
            buttonText.dataset.originalText =
                buttonText.textContent.trim() || "Sign In";
        }

        buttonText.textContent = isLoading
            ? "Signing in..."
            : buttonText.dataset.originalText;
    }
}

/**
 * Clear validation and status messages.
 */
export function clearLoginMessages() {
    showValidationErrors({
        email: "",
        password: ""
    });

    showFormMessage("");
}

/**
 * Update the login button to display a success state.
 */
export function showLoginSuccess() {
    const button = getElement("loginButton");
    const buttonText = button?.querySelector(".button-text");

    if (button) {
        button.disabled = true;
        button.setAttribute("aria-busy", "false");
    }

    if (buttonText) {
        buttonText.textContent = "Login successful!";
    }

    showFormMessage(
        "Login successful! Redirecting to your dashboard...",
        "success"
    );
}
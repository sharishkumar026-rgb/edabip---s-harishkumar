
/* =====================================================
   EDABIP — LOGIN UI MANAGEMENT
   File: js/ui.js
   Day 2: Validation, loading and status states
   ===================================================== */

/**
 * Find an element safely by ID.
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function getElement(id) {
    return document.getElementById(id);
}


// =====================================================
// 1. FIELD VALIDATION ERRORS
// =====================================================

/**
 * Display an individual field validation error.
 * Supports #emailError and #passwordError.
 *
 * @param {"email"|"password"} field
 * @param {string} message
 */
export function showFieldError(field, message = "") {
    const errorElement = getElement(`${field}Error`);
    const inputElement = getElement(field);
    const hasError = Boolean(message);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.hidden = !hasError;
    }

    if (inputElement) {
        inputElement.setAttribute("aria-invalid", String(hasError));

        if (errorElement) {
            if (hasError) {
                inputElement.setAttribute("aria-describedby", errorElement.id);
            } else {
                inputElement.removeAttribute("aria-describedby");
            }
        }
    }
}


// =====================================================
// 2. VALIDATION SUMMARY
// =====================================================

/**
 * Display email and password validation errors.
 * @param {{email?: string, password?: string}} errors
 */
export function showValidationErrors(errors = {}) {
    showFieldError("email", errors.email || "");
    showFieldError("password", errors.password || "");
}


// =====================================================
// 3. GENERAL FORM MESSAGE
// =====================================================

/**
 * Display a login status message.
 *
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

    if (!message) {
        messageElement.removeAttribute("role");
        messageElement.removeAttribute("aria-live");
        return;
    }

    const validTypes = ["success", "error", "info"];
    const messageType = validTypes.includes(type) ? type : "info";

    messageElement.classList.add(messageType);
    messageElement.setAttribute(
        "role",
        messageType === "error" ? "alert" : "status"
    );
    messageElement.setAttribute("aria-live", "polite");
}


// =====================================================
// 4. LOGIN BUTTON LOADING STATE
// =====================================================

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

    if (!buttonText) {
        return;
    }

    if (!buttonText.dataset.originalText) {
        buttonText.dataset.originalText =
            buttonText.textContent.trim() || "Sign In";
    }

    buttonText.textContent = isLoading
        ? "Signing in..."
        : buttonText.dataset.originalText;
}


// =====================================================
// 5. CLEAR LOGIN MESSAGES
// =====================================================

/**
 * Clear field validation and general status messages.
 */
export function clearLoginMessages() {
    showValidationErrors({
        email: "",
        password: ""
    });

    showFormMessage("");
}


// =====================================================
// 6. LOGIN SUCCESS STATE
// =====================================================

/**
 * Display a successful login state.
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


/* =====================================================
   EDABIP — LOGIN UI MANAGEMENT
   File: js/ui.js
   Day 3: Validation, loading, accessibility and status states
   ===================================================== */

/**
 * Safely find an element by its ID.
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
 * Display or clear a field validation error.
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

        if (hasError && errorElement) {
            inputElement.setAttribute("aria-describedby", errorElement.id);
        } else if (
            !hasError &&
            inputElement.getAttribute("aria-describedby") === `${field}Error`
        ) {
            inputElement.removeAttribute("aria-describedby");
        }
    }
}


// =====================================================
// 2. VALIDATION SUMMARY
// =====================================================

/**
 * Display validation errors for email and password.
 *
 * @param {{email?: string, password?: string}} errors
 */
export function showValidationErrors(errors = {}) {
    showFieldError("email", errors.email || "");
    showFieldError("password", errors.password || "");
}


// =====================================================
// 3. GENERAL FORM STATUS MESSAGE
// =====================================================

/**
 * Display a success, error or information message.
 *
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
export function showFormMessage(message, type = "info") {
    const messageElement = getElement("formMessage");

    if (!messageElement) {
        if (message) {
            console.info(`[EDABIP ${type.toUpperCase()}] ${message}`);
        }
        return;
    }

    // Clear previous state classes.
    messageElement.classList.remove(
        "success",
        "error",
        "info",
        "message-success",
        "message-error",
        "message-info"
    );

    if (!message) {
        messageElement.textContent = "";
        messageElement.hidden = true;
        messageElement.removeAttribute("role");
        messageElement.removeAttribute("aria-live");
        return;
    }

    const validTypes = ["success", "error", "info"];
    const messageType = validTypes.includes(type) ? type : "info";

    messageElement.textContent = message;
    messageElement.hidden = false;

    // Support both common CSS naming conventions.
    messageElement.classList.add(messageType);
    messageElement.classList.add(`message-${messageType}`);

    // Announce important messages to assistive technology.
    messageElement.setAttribute(
        "role",
        messageType === "error" ? "alert" : "status"
    );

    messageElement.setAttribute(
        "aria-live",
        messageType === "error" ? "assertive" : "polite"
    );
}


// =====================================================
// 4. LOGIN BUTTON LOADING STATE
// =====================================================

/**
 * Enable or disable the login button while signing in.
 *
 * @param {boolean} isLoading
 */
export function setLoginLoading(isLoading) {
    const button = getElement("loginButton");

    if (!button) return;

    const buttonText = button.querySelector(".button-text");

    button.disabled = isLoading;
    button.setAttribute("aria-busy", String(isLoading));

    if (!buttonText) return;

    // Store the original label once.
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
 * Clear all field errors and the general form message.
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
 * Display the successful login state.
 * The main controller can redirect after calling this function.
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

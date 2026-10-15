
/* =====================================================
   EDABIP — FORM VALIDATION
   File: js/validators.js
   Day 3: Email and password validation
   ===================================================== */


/**
 * Validate an email address.
 *
 * @param {string} email
 * @returns {string} Error message, or an empty string if valid.
 */
export function validateEmail(email) {
    const value = String(email ?? "").trim();

    if (!value) {
        return "Please enter your email address.";
    }

    // Basic email format validation.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        return "Please enter a valid email address.";
    }

    return "";
}


/**
 * Validate a password.
 *
 * @param {string} password
 * @returns {string} Error message, or an empty string if valid.
 */
export function validatePassword(password) {
    const value = String(password ?? "");

    if (!value.trim()) {
        return "Please enter your password.";
    }

    if (value.length < 8) {
        return "Password must contain at least 8 characters.";
    }

    return "";
}


/**
 * Validate all login form fields.
 *
 * @param {{email?: string, password?: string}} fields
 * @returns {{
 *   email: string,
 *   password: string,
 *   isValid: boolean
 * }}
 */
export function validateLoginForm({ email, password } = {}) {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    return {
        email: emailError,
        password: passwordError,
        isValid: !emailError && !passwordError
    };
}

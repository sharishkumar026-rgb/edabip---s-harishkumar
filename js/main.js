
/* =====================================================
   EDABIP — MAIN LOGIN CONTROLLER
   File: js/main.js
   Day 2: Login validation, authentication and UI handling
   ===================================================== */

import { login } from "./auth.js";

import {
    getRememberedEmail,
    saveRememberedEmail
} from "./storage.js";

import {
    clearLoginMessages,
    showFieldError,
    showFormMessage,
    showLoginSuccess,
    showValidationErrors,
    setLoginLoading
} from "./ui.js";

import {
    validateLoginForm
} from "./validators.js";

// Initialize after the HTML document has loaded.
document.addEventListener("DOMContentLoaded", initializeLoginPage);


// =====================================================
// 1. INITIALIZE LOGIN PAGE
// =====================================================

function initializeLoginPage() {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");
    const togglePassword = document.getElementById("togglePassword");

    // Stop if the required login form is missing.
    if (!loginForm) {
        console.error("EDABIP: Login form #loginForm was not found.");
        return;
    }

    // Restore the remembered email.
    if (emailInput && rememberMe) {
        try {
            const rememberedEmail = getRememberedEmail();

            if (rememberedEmail) {
                emailInput.value = rememberedEmail;
                rememberMe.checked = true;
            }
        } catch (error) {
            console.warn("EDABIP: Could not restore remembered email.", error);
        }
    }

    // Handle login form submission.
    loginForm.addEventListener("submit", handleLoginSubmit);

    // Clear errors when the user edits the email.
    emailInput?.addEventListener("input", () => {
        showFieldError("email", "");
        showFormMessage("");
    });

    // Clear errors when the user edits the password.
    passwordInput?.addEventListener("input", () => {
        showFieldError("password", "");
        showFormMessage("");
    });

    // Password show/hide functionality.
    if (togglePassword && passwordInput) {
        togglePassword.setAttribute("aria-label", "Show password");
        togglePassword.setAttribute("aria-pressed", "false");

        togglePassword.addEventListener("click", () => {
            const shouldShow = passwordInput.type === "password";

            passwordInput.type = shouldShow ? "text" : "password";

            togglePassword.setAttribute(
                "aria-label",
                shouldShow ? "Hide password" : "Show password"
            );

            togglePassword.setAttribute(
                "aria-pressed",
                String(shouldShow)
            );
        });
    }

    // Prevent placeholder links from jumping to the top.
    const placeholderLinks = document.querySelectorAll(
        "#forgotPassword, #signupLink, #privacyLink, #termsLink, #helpLink"
    );

    placeholderLinks.forEach(link => {
        link.addEventListener("click", event => {
            if (link.getAttribute("href") === "#") {
                event.preventDefault();
            }
        });
    });

    // Update the footer year automatically.
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Google sign-in demo handler.
    document.getElementById("googleLogin")?.addEventListener("click", () => {
        showFormMessage(
            "Google sign-in is a demo and is not connected to an identity provider.",
            "info"
        );
    });

    // Microsoft sign-in demo handler.
    document.getElementById("microsoftLogin")?.addEventListener("click", () => {
        showFormMessage(
            "Microsoft sign-in is a demo and is not connected to an identity provider.",
            "info"
        );
    });

    // Initialize email and SSO tabs.
    initializeLoginTabs();

    console.info("EDABIP: Login page initialized successfully.");
}


// =====================================================
// 2. HANDLE LOGIN SUBMISSION
// =====================================================

async function handleLoginSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");

    if (!emailInput || !passwordInput) {
        showFormMessage(
            "The login form is missing required fields.",
            "error"
        );
        return;
    }

    clearLoginMessages();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate fields before attempting authentication.
    const validation = validateLoginForm({ email, password });

    if (!validation.isValid) {
        showValidationErrors(validation);
        showFormMessage(
            "Please correct the highlighted fields.",
            "error"
        );

        return;
    }

    // Disable the login button and show the loading state.
    setLoginLoading(true);

    try {
        // Authenticate against the JSON and registered demo users.
        const result = await login({ email, password });

        if (!result || !result.success) {
            if (result?.errors) {
                showValidationErrors(result.errors);

                showFormMessage(
                    "Please correct the highlighted fields.",
                    "error"
                );
            } else {
                showFormMessage(
                    result?.message || "Invalid email or password.",
                    "error"
                );
            }

            return;
        }

        // Store or clear the remembered email.
        saveRememberedEmail(
            email,
            Boolean(rememberMe?.checked)
        );

        // Show a success message before navigating.
        showLoginSuccess();

        // Redirect to the dashboard after successful login.
        window.location.replace("./dashboard.html");

    } catch (error) {
        console.error("EDABIP: Login failed.", error);

        showFormMessage(
            error?.message?.toLowerCase().includes("users.json") ||
            error?.message?.toLowerCase().includes("load user")
                ? "Unable to load login data. Please try again."
                : "Something went wrong. Please try again.",
            "error"
        );

    } finally {
        // Restore the button after completion or failure.
        setLoginLoading(false);
    }
}


// =====================================================
// 3. INITIALIZE LOGIN TABS
// =====================================================

function initializeLoginTabs() {
    const emailTab = document.getElementById("emailTab");
    const ssoTab = document.getElementById("ssoTab");

    if (!emailTab || !ssoTab) {
        return;
    }

    emailTab.addEventListener("click", () => {
        emailTab.classList.add("active");
        ssoTab.classList.remove("active");

        emailTab.setAttribute("aria-selected", "true");
        ssoTab.setAttribute("aria-selected", "false");

        showFormMessage("");
    });

    ssoTab.addEventListener("click", () => {
        ssoTab.classList.add("active");
        emailTab.classList.remove("active");

        ssoTab.setAttribute("aria-selected", "true");
        emailTab.setAttribute("aria-selected", "false");

        showFormMessage(
            "Single sign-on is not connected in this demo.",
            "info"
        );
    });
}

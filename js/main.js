
/* =====================================================
   EDABIP — MAIN LOGIN CONTROLLER
   File: js/main.js
   Day 3: UI polish, accessibility and event handling
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

import { validateLoginForm } from "./validators.js";

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

    if (!loginForm) {
        console.error("EDABIP: Login form #loginForm was not found.");
        return;
    }

    // Restore remembered email safely.
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

    // Form submission.
    loginForm.addEventListener("submit", handleLoginSubmit);

    // Clear validation feedback as fields are edited.
    emailInput?.addEventListener("input", () => {
        showFieldError("email", "");
        showFormMessage("");
    });

    passwordInput?.addEventListener("input", () => {
        showFieldError("password", "");
        showFormMessage("");
    });

    // Password visibility toggle.
    if (togglePassword && passwordInput) {
        togglePassword.type = "button";
        togglePassword.setAttribute("aria-label", "Show password");
        togglePassword.setAttribute("aria-pressed", "false");

        togglePassword.addEventListener("click", () => {
            const isPasswordHidden = passwordInput.type === "password";

            passwordInput.type = isPasswordHidden ? "text" : "password";

            togglePassword.setAttribute(
                "aria-label",
                isPasswordHidden ? "Hide password" : "Show password"
            );

            togglePassword.setAttribute(
                "aria-pressed",
                String(isPasswordHidden)
            );

            passwordInput.focus();
        });
    } else {
        console.warn(
            "EDABIP: Password toggle or password input was not found."
        );
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

    // Footer year.
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Demo social sign-in messages.
    document.getElementById("googleLogin")?.addEventListener("click", () => {
        showFormMessage(
            "Google sign-in is a demo and is not connected to an identity provider.",
            "info"
        );
    });

    document.getElementById("microsoftLogin")?.addEventListener("click", () => {
        showFormMessage(
            "Microsoft sign-in is a demo and is not connected to an identity provider.",
            "info"
        );
    });

    // Email and SSO tabs.
    initializeLoginTabs();

    // Support button.
    document.getElementById("floatingSupport")?.addEventListener("click", () => {
        const helpLink = document.getElementById("helpLink");

        if (helpLink && helpLink.getAttribute("href") !== "#") {
            window.location.href = helpLink.href;
        } else {
            showFormMessage(
                "For support, please contact your EDABIP project coordinator.",
                "info"
            );
        }
    });

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

    // Validate before authentication.
    const validation = validateLoginForm({ email, password });

    if (!validation.isValid) {
        showValidationErrors(validation);
        showFormMessage(
            "Please correct the highlighted fields.",
            "error"
        );
        return;
    }

    setLoginLoading(true);

    let loginSucceeded = false;

    try {
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

        // Save or clear the remembered email preference.
        saveRememberedEmail(email, Boolean(rememberMe?.checked));

        loginSucceeded = true;
        showLoginSuccess();

        // Navigate only after successful authentication.
        window.location.assign("./dashboard.html");

    } catch (error) {
        console.error("EDABIP: Login failed.", error);

        const errorMessage = String(error?.message || "").toLowerCase();

        if (
            errorMessage.includes("users.json") ||
            errorMessage.includes("load user") ||
            errorMessage.includes("fetch")
        ) {
            showFormMessage(
                "Unable to load login data. Please run the project with VS Code Live Server and try again.",
                "error"
            );
        } else {
            showFormMessage(
                "Something went wrong. Please try again.",
                "error"
            );
        }
    } finally {
        if (!loginSucceeded) {
            setLoginLoading(false);
        }
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
            "Single sign-on is not connected in this demo. Please use email login.",
            "info"
        );
    });
}

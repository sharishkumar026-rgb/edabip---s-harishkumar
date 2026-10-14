
// ============================================
// EDABIP — MAIN LOGIN CONTROLLER
// File: js/main.js
// ============================================

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

document.addEventListener("DOMContentLoaded", initializeLoginPage);

// --------------------------------------------
// INITIALIZE LOGIN PAGE
// --------------------------------------------

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

    // Restore remembered email.
    if (emailInput && rememberMe) {
        const rememberedEmail = getRememberedEmail();

        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMe.checked = true;
        }
    }

    // Attach form submission.
    loginForm.addEventListener("submit", handleLoginSubmit);

    // Clear field errors as the user edits.
    emailInput?.addEventListener("input", () => {
        showFieldError("email", "");
        showFormMessage("");
    });

    passwordInput?.addEventListener("input", () => {
        showFieldError("password", "");
        showFormMessage("");
    });

    // Password show/hide.
    togglePassword?.addEventListener("click", () => {
        if (!passwordInput) {
            return;
        }

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

    // Prevent placeholder links from reloading the page.
    document.querySelectorAll(
        "#forgotPassword, #signupLink, #privacyLink, #termsLink, #helpLink"
    ).forEach(link => {
        link.addEventListener("click", event => {
            if (link.getAttribute("href") === "#") {
                event.preventDefault();
            }
        });
    });

    // Current footer year.
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Basic demo handlers for social sign-in buttons.
    document.getElementById("googleLogin")?.addEventListener("click", () => {
        showFormMessage(
            "Google sign-in is a UI demo and is not connected to an identity provider.",
            "info"
        );
    });

    document.getElementById("microsoftLogin")?.addEventListener("click", () => {
        showFormMessage(
            "Microsoft sign-in is a UI demo and is not connected to an identity provider.",
            "info"
        );
    });

    // Optional email / SSO tabs.
    initializeLoginTabs();
}

// --------------------------------------------
// HANDLE LOGIN SUBMISSION
// --------------------------------------------

async function handleLoginSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");

    if (!emailInput || !passwordInput) {
        showFormMessage("The login form is missing required fields.", "error");
        return;
    }

    clearLoginMessages();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    setLoginLoading(true);

    try {
        const result = await login({ email, password });

        if (!result.success) {
            setLoginLoading(false);

            if (result.errors) {
                showValidationErrors(result.errors);
                showFormMessage("Please correct the highlighted fields.", "error");
            } else {
                showFormMessage(
                    result.message || "Unable to sign in. Please try again.",
                    "error"
                );
            }

            return;
        }

        saveRememberedEmail(email, Boolean(rememberMe?.checked));

        showLoginSuccess();

        // Redirect after a successful demo login.
        window.location.href = "./dashboard.html";
    } catch (error) {
        console.error("EDABIP login failed:", error);
        setLoginLoading(false);

        showFormMessage(
            "Something went wrong. Please try again.",
            "error"
        );
    }
}

// --------------------------------------------
// LOGIN TABS
// --------------------------------------------

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

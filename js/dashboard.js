
// ============================================
// EDABIP — DASHBOARD CONTROLLER
// File: js/dashboard.js
// ============================================

import { getSession, logout } from "./storage.js";

document.addEventListener("DOMContentLoaded", initializeDashboard);

// --------------------------------------------
// INITIALIZE DASHBOARD
// --------------------------------------------

function initializeDashboard() {
    let session;

    try {
        session = getSession();
    } catch (error) {
        console.error("EDABIP session error:", error);
        redirectToLogin();
        return;
    }

    // Redirect users who are not logged in.
    if (!session || session.authenticated !== true) {
        redirectToLogin();
        return;
    }

    displayUser(session);
    initializeLogout();
}

// --------------------------------------------
// DISPLAY USER DETAILS
// --------------------------------------------

function displayUser(user) {
    const userElement = document.getElementById("dashboardUser");
    const welcomeElement = document.getElementById("dashboardWelcome");

    const displayName =
        typeof user.name === "string" && user.name.trim()
            ? user.name.trim()
            : user.email;

    if (userElement) {
        userElement.textContent = displayName;
    }

    if (welcomeElement) {
        welcomeElement.textContent =
            `Welcome back, ${displayName || "EDABIP User"}. ` +
            "Your analytics workspace is ready.";
    }
}

// --------------------------------------------
// LOGOUT
// --------------------------------------------

function initializeLogout() {
    const logoutButton = document.getElementById("logoutButton");

    if (!logoutButton) {
        console.warn("EDABIP: Logout button was not found.");
        return;
    }

    logoutButton.addEventListener("click", handleLogout);
}

function handleLogout() {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.disabled = true;
    }

    try {
        logout();
        redirectToLogin();
    } catch (error) {
        console.error("EDABIP logout error:", error);

        if (logoutButton) {
            logoutButton.disabled = false;
        }
    }
}

// --------------------------------------------
// REDIRECT
// --------------------------------------------

function redirectToLogin() {
    window.location.replace("./index.html");
}

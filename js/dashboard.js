
// ============================================
// EDABIP — DASHBOARD CONTROLLER
// File: js/dashboard.js
// ============================================

import {
    getSession,
    logout
} from "./storage.js";

document.addEventListener("DOMContentLoaded", initializeDashboard);

// --------------------------------------------
// INITIALIZE DASHBOARD
// --------------------------------------------

function initializeDashboard() {
    const session = getSession();

    // Redirect users who are not logged in.
    if (!session || session.authenticated !== true) {
        window.location.replace("./index.html");
        return;
    }

    // Display the logged-in user's details.
    displayUser(session);

    // Set up logout.
    const logoutButton = document.getElementById("logoutButton");

    logoutButton?.addEventListener("click", handleLogout);
}

// --------------------------------------------
// DISPLAY USER DETAILS
// --------------------------------------------

function displayUser(user) {
    const userElement = document.getElementById("dashboardUser");
    const welcomeElement = document.getElementById("dashboardWelcome");

    if (userElement) {
        userElement.textContent = user.name || user.email;
    }

    if (welcomeElement) {
        welcomeElement.textContent =
            `Welcome back, ${user.name || "EDABIP User"}. ` +
            "Your analytics workspace is ready.";
    }
}

// --------------------------------------------
// LOGOUT
// --------------------------------------------

function handleLogout() {
    logout();

    // Return to login and prevent the dashboard from remaining
    // in the current browser history entry.
    window.location.replace("./index.html");
}

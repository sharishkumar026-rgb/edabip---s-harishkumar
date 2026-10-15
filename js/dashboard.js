
/* =====================================================
   EDABIP — DASHBOARD CONTROLLER
   File: js/dashboard.js
   Day 3: Session protection, user details and logout
   ===================================================== */

import { getSession, logout } from "./storage.js";

document.addEventListener("DOMContentLoaded", initializeDashboard);


// =====================================================
// 1. INITIALIZE DASHBOARD
// =====================================================

function initializeDashboard() {
    let session;

    try {
        session = getSession();
    } catch (error) {
        console.error("EDABIP: Session verification failed.", error);
        redirectToLogin();
        return;
    }

    // Protect the dashboard from visitors without a session.
    if (!session || session.authenticated !== true) {
        redirectToLogin();
        return;
    }

    displayUser(session);
    initializeLogout();

    console.info("EDABIP: Dashboard initialized successfully.");
}


// =====================================================
// 2. DISPLAY USER DETAILS
// =====================================================

function displayUser(user) {
    const userElement = document.getElementById("dashboardUser");
    const welcomeElement = document.getElementById("dashboardWelcome");
    const roleElement = document.getElementById("dashboardRole");

    const displayName =
        typeof user.name === "string" && user.name.trim()
            ? user.name.trim()
            : user.email || "EDABIP User";

    if (userElement) {
        userElement.textContent = displayName;
    }

    if (welcomeElement) {
        welcomeElement.textContent =
            `Welcome back, ${displayName}. ` +
            "Your analytics workspace is ready.";
    }

    if (roleElement) {
        roleElement.textContent = user.role || "User";
    }
}


// =====================================================
// 3. LOGOUT INITIALIZATION
// =====================================================

function initializeLogout() {
    const logoutButton = document.getElementById("logoutButton");

    if (!logoutButton) {
        console.warn(
            "EDABIP: Logout button #logoutButton was not found."
        );
        return;
    }

    logoutButton.addEventListener("click", handleLogout);
}


// =====================================================
// 4. HANDLE LOGOUT
// =====================================================

function handleLogout() {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton?.disabled) {
        return;
    }

    if (logoutButton) {
        logoutButton.disabled = true;
        logoutButton.setAttribute("aria-busy", "true");
    }

    try {
        logout();

        // Replace dashboard history with the login page.
        redirectToLogin();
    } catch (error) {
        console.error("EDABIP: Logout failed.", error);

        if (logoutButton) {
            logoutButton.disabled = false;
            logoutButton.setAttribute("aria-busy", "false");
        }

        const messageElement =
            document.getElementById("dashboardMessage");

        if (messageElement) {
            messageElement.textContent =
                "Unable to log out. Please try again.";
            messageElement.hidden = false;
            messageElement.setAttribute("role", "alert");
        }
    }
}


// =====================================================
// 5. REDIRECT TO LOGIN
// =====================================================

function redirectToLogin() {
    window.location.replace("./index.html");
}

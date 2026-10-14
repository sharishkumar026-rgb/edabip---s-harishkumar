
// ============================================
// EDABIP — USER DATA LOADER
// File: js/data.js
// ============================================

const USERS_URL = "./data/users.json";

/**
 * Load demo users from the JSON file.
 * @returns {Promise<Array>}
 */
export async function loadUsers() {
    let response;

    try {
        response = await fetch(USERS_URL);
    } catch (error) {
        console.error("Unable to connect to the user data file:", error);
        throw new Error(
            "Unable to load user data. Please run the project using Live Server."
        );
    }

    if (!response.ok) {
        throw new Error(
            `Unable to load user data (HTTP ${response.status}).`
        );
    }

    let users;

    try {
        users = await response.json();
    } catch (error) {
        console.error("Invalid users.json file:", error);
        throw new Error("The user data file contains invalid JSON.");
    }

    if (!Array.isArray(users)) {
        throw new Error("The user data file must contain a list of users.");
    }

    if (users.length === 0) {
        throw new Error("No demo users are currently available.");
    }

    return users;
}

/**
 * Find a demo user by email address.
 * @param {string} email
 * @returns {Promise<object|null>}
 */
export async function findUserByEmail(email) {
    const users = await loadUsers();

    const normalizedEmail = String(email ?? "")
        .trim()
        .toLowerCase();

    return users.find(user =>
        String(user.email ?? "").trim().toLowerCase() === normalizedEmail
    ) || null;
}

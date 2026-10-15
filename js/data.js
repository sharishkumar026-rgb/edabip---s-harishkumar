
/* =====================================================
   EDABIP — USER DATA LOADER
   File: js/data.js
   Day 2: JSON loading and error handling
   ===================================================== */

const USERS_URL = "./data/users.json";

/**
 * Load demo users from the JSON file.
 * @returns {Promise<Array>}
 */
export async function loadUsers() {
    let response;

    // 1. Fetch JSON data.
    try {
        response = await fetch(USERS_URL);
    } catch (error) {
        console.error("EDABIP: Unable to fetch user data.", error);

        throw new Error(
            "Unable to load login data. Please check Live Server and try again."
        );
    }

    // 2. Handle HTTP errors.
    if (!response.ok) {
        console.error(
            `EDABIP: User data request failed with HTTP ${response.status}.`
        );

        throw new Error(
            `Unable to load login data (HTTP ${response.status}).`
        );
    }

    // 3. Parse JSON.
    let users;

    try {
        users = await response.json();
    } catch (error) {
        console.error("EDABIP: Invalid JSON in users.json.", error);

        throw new Error(
            "The login data file contains invalid JSON."
        );
    }

    // 4. Verify that the JSON contains an array.
    if (!Array.isArray(users)) {
        throw new Error(
            "The login data file must contain a list of users."
        );
    }

    // 5. Handle an empty user list.
    if (users.length === 0) {
        throw new Error(
            "No demo users are currently available."
        );
    }

    // 6. Keep records with usable email and password fields.
    const validUsers = users.filter(user =>
        user &&
        typeof user.email === "string" &&
        user.email.trim() !== "" &&
        typeof user.password === "string" &&
        user.password !== ""
    );

    if (validUsers.length === 0) {
        throw new Error(
            "No valid user records were found in the login data."
        );
    }

    return validUsers;
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
        user.email.trim().toLowerCase() === normalizedEmail
    ) || null;
}

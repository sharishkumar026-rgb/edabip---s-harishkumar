
/* =====================================================
   EDABIP — USER DATA LOADER
   File: js/data.js
   Day 3: JSON loading, validation and error handling
   ===================================================== */

const USERS_URL = "./data/users.json";

// Cache successfully loaded users for this page session.
let usersCache = null;
let usersPromise = null;

/**
 * Validate a user record.
 *
 * @param {unknown} user
 * @returns {boolean}
 */
function isValidUser(user) {
    return (
        user !== null &&
        typeof user === "object" &&
        typeof user.email === "string" &&
        user.email.trim() !== "" &&
        typeof user.password === "string" &&
        user.password.length > 0
    );
}

/**
 * Load demo users from the JSON file.
 *
 * Requires the application to run through a local or
 * production HTTP server, such as VS Code Live Server.
 *
 * @returns {Promise<Array<object>>}
 */
export async function loadUsers() {
    if (usersCache) {
        return usersCache;
    }

    if (usersPromise) {
        return usersPromise;
    }

    usersPromise = fetch(USERS_URL, {
        headers: {
            Accept: "application/json"
        },
        cache: "no-store"
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(
                    `Unable to load login data (HTTP ${response.status}).`
                );
            }

            let users;

            try {
                users = await response.json();
            } catch {
                throw new Error(
                    "The login data file contains invalid JSON."
                );
            }

            if (!Array.isArray(users)) {
                throw new Error(
                    "The login data file must contain a list of users."
                );
            }

            if (users.length === 0) {
                throw new Error(
                    "No demo users are currently available."
                );
            }

            const validUsers = users.filter(isValidUser);

            if (validUsers.length === 0) {
                throw new Error(
                    "No valid user records were found in the login data."
                );
            }

            usersCache = validUsers;
            return usersCache;
        })
        .catch(error => {
            console.error("EDABIP: User data loading failed.", error);

            if (error instanceof TypeError) {
                throw new Error(
                    "Unable to load login data. Please check Live Server and try again."
                );
            }

            throw error;
        })
        .finally(() => {
            // Permit a retry after a failed request.
            usersPromise = null;
        });

    return usersPromise;
}

/**
 * Find a demo user by email address.
 *
 * @param {string} email
 * @returns {Promise<object|null>}
 */
export async function findUserByEmail(email) {
    const users = await loadUsers();

    const normalizedEmail = String(email ?? "")
        .trim()
        .toLowerCase();

    return (
        users.find(user =>
            user.email.trim().toLowerCase() === normalizedEmail
        ) || null
    );
}

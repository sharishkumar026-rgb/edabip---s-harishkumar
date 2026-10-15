
/* =====================================================
   EDABIP — AUTHENTICATION MODULE
   File: js/auth.js
   Day 2: JSON authentication and session handling
   ===================================================== */

import { validateLoginForm } from "./validators.js";
import { loadUsers } from "./data.js";
import { saveSession } from "./storage.js";

const REGISTERED_USERS_KEY = "edabip_registered_users";

/**
 * Read users registered locally.
 * @returns {Array}
 */
function getRegisteredUsers() {
    try {
        const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);

        if (!storedUsers) {
            return [];
        }

        const users = JSON.parse(storedUsers);

        if (!Array.isArray(users)) {
            console.warn("EDABIP: Registered user data is not an array.");
            return [];
        }

        return users.filter(user =>
            user &&
            typeof user.email === "string" &&
            typeof user.password === "string"
        );
    } catch (error) {
        console.error("EDABIP: Could not read registered users.", error);
        return [];
    }
}

/**
 * Authenticate a user with email and password.
 *
 * @param {{email: string, password: string}} credentials
 * @returns {Promise<{success: boolean, user?: object, errors?: object, message?: string}>}
 */
export async function login({ email, password } = {}) {
    // Validate the submitted credentials.
    const validation = validateLoginForm({ email, password });

    if (!validation.isValid) {
        return {
            success: false,
            errors: {
                email: validation.email,
                password: validation.password
            },
            message: "Please correct the highlighted fields."
        };
    }

    try {
        // Load demo users. Errors here should not be treated
        // as incorrect credentials.
        const demoUsers = await loadUsers();

        if (!Array.isArray(demoUsers)) {
            throw new Error("Unable to load login data. Please try again.");
        }

        // Add users registered locally in this prototype.
        const registeredUsers = getRegisteredUsers();
        const allUsers = [...demoUsers, ...registeredUsers];

        const normalizedEmail = String(email).trim().toLowerCase();
        const submittedPassword = String(password);

        // Match email case-insensitively and password exactly.
        const user = allUsers.find(candidate =>
            candidate &&
            String(candidate.email ?? "").trim().toLowerCase() === normalizedEmail &&
            String(candidate.password ?? "") === submittedPassword
        );

        if (!user) {
            return {
                success: false,
                message: "Invalid email or password. Please try again."
            };
        }

        // Save only the user information needed for the session.
        const sessionUser = {
            id: user.id ?? user.email,
            name: user.name ?? "EDABIP User",
            email: user.email,
            role: user.role ?? "User"
        };

        // Persist the authenticated session.
        saveSession(sessionUser);

        return {
            success: true,
            user: sessionUser,
            message: "Login successful! Redirecting to your dashboard..."
        };

    } catch (error) {
        console.error("EDABIP authentication error:", error);

        return {
            success: false,
            errorType: "data",
            message:
                error?.message ||
                "Unable to load login data. Please try again."
        };
    }
}

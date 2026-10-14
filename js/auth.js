
// ============================================
// EDABIP — AUTHENTICATION
// File: js/auth.js
// ============================================

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
        return Array.isArray(users) ? users : [];
    } catch (error) {
        console.error("Unable to read registered users:", error);
        return [];
    }
}

/**
 * Authenticate a user with email and password.
 * @param {{email: string, password: string}} credentials
 * @returns {Promise<{success: boolean, user?: object, errors?: object, message?: string}>}
 */
export async function login({ email, password } = {}) {
    const validation = validateLoginForm({ email, password });

    if (!validation.isValid) {
        return {
            success: false,
            errors: {
                email: validation.email,
                password: validation.password
            }
        };
    }

    try {
        const demoUsers = await loadUsers();
        const registeredUsers = getRegisteredUsers();
        const allUsers = [...demoUsers, ...registeredUsers];

        const normalizedEmail = String(email).trim().toLowerCase();

        const user = allUsers.find(candidate =>
            String(candidate.email ?? "").trim().toLowerCase() === normalizedEmail &&
            String(candidate.password ?? "") === String(password)
        );

        if (!user) {
            return {
                success: false,
                message: "Invalid email or password. Please try again."
            };
        }

        const sessionUser = {
            id: user.id ?? user.email,
            name: user.name ?? "EDABIP User",
            email: user.email,
            role: user.role ?? "User"
        };

        saveSession(sessionUser);

        return {
            success: true,
            user: sessionUser,
            message: "Login successful! Redirecting to your dashboard..."
        };
    } catch (error) {
        console.error("Login error:", error);

        return {
            success: false,
            message: error.message ||
                "Unable to sign in right now. Please try again."
        };
    }
}

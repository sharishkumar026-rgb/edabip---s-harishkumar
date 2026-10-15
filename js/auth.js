
/* =====================================================
   EDABIP — AUTHENTICATION MODULE
   File: js/auth.js
   Day 3: Authentication and session handling
   ===================================================== */

import { validateLoginForm } from "./validators.js";
import { loadUsers } from "./data.js";
import { saveSession } from "./storage.js";

const REGISTERED_USERS_KEY = "edabip_registered_users";

/**
 * Read locally registered demo users.
 * Note: localStorage is suitable only for this frontend prototype.
 *
 * @returns {Array<object>}
 */
function getRegisteredUsers() {
    try {
        const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);

        if (!storedUsers) {
            return [];
        }

        const users = JSON.parse(storedUsers);

        if (!Array.isArray(users)) {
            console.warn(
                "EDABIP: Registered user data must be an array."
            );
            return [];
        }

        return users.filter(user =>
            user &&
            typeof user.email === "string" &&
            typeof user.password === "string"
        );
    } catch (error) {
        console.error(
            "EDABIP: Could not read registered users.",
            error
        );

        // Malformed stored data should not silently become
        // a valid empty user list.
        throw new Error(
            "Unable to read registered user data. Please clear the demo data and try again."
        );
    }
}

/**
 * Authenticate a user with email and password.
 *
 * @param {{email: string, password: string}} credentials
 * @returns {Promise<{
 *   success: boolean,
 *   user?: object,
 *   errors?: object,
 *   errorType?: string,
 *   message?: string
 * }>}
 */
export async function login({ email, password } = {}) {
    // 1. Validate submitted credentials.
    const validation = validateLoginForm({
        email,
        password
    });

    if (!validation.isValid) {
        return {
            success: false,
            errors: {
                email: validation.email || "",
                password: validation.password || ""
            },
            message: "Please correct the highlighted fields."
        };
    }

    try {
        // 2. Load demo users from data/users.json.
        const demoUsers = await loadUsers();

        if (!Array.isArray(demoUsers)) {
            throw new Error(
                "Login data has an invalid format."
            );
        }

        // 3. Include locally registered prototype users.
        const registeredUsers = getRegisteredUsers();
        const allUsers = [...demoUsers, ...registeredUsers];

        // 4. Normalize email, but never trim or lowercase passwords.
        const normalizedEmail = String(email).trim().toLowerCase();
        const submittedPassword = String(password);

        const user = allUsers.find(candidate =>
            candidate &&
            typeof candidate.email === "string" &&
            typeof candidate.password === "string" &&
            candidate.email.trim().toLowerCase() === normalizedEmail &&
            candidate.password === submittedPassword
        );

        // 5. Return a credential error if no user matches.
        if (!user) {
            return {
                success: false,
                errorType: "credentials",
                message: "Invalid email or password. Please try again."
            };
        }

        // 6. Build a session object without password information.
        const sessionUser = {
            id: user.id ?? normalizedEmail,
            name: user.name ?? "EDABIP User",
            email: normalizedEmail,
            role: user.role ?? "User"
        };

        // 7. Save the session.
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
            message: error?.message ||
                "Unable to load login data. Please try again."
        };
    }
}

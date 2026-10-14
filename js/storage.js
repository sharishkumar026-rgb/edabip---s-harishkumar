
// ============================================
// EDABIP — LOCAL STORAGE MANAGEMENT
// File: js/storage.js
// ============================================

const STORAGE_KEYS = {
    rememberedEmail: "edabip_remembered_email",
    session: "edabip_session"
};

// --------------------------------------------
// REMEMBERED EMAIL
// --------------------------------------------

/**
 * Save the email only when Remember Me is enabled.
 * @param {string} email
 * @param {boolean} rememberMe
 */
export function saveRememberedEmail(email, rememberMe) {
    try {
        if (rememberMe) {
            localStorage.setItem(
                STORAGE_KEYS.rememberedEmail,
                String(email ?? "").trim()
            );
        } else {
            localStorage.removeItem(STORAGE_KEYS.rememberedEmail);
        }
    } catch (error) {
        console.error("Unable to save remembered email:", error);
    }
}

/**
 * Get the previously remembered email address.
 * @returns {string}
 */
export function getRememberedEmail() {
    try {
        return localStorage.getItem(STORAGE_KEYS.rememberedEmail) || "";
    } catch (error) {
        console.error("Unable to retrieve remembered email:", error);
        return "";
    }
}

/**
 * Clear the remembered email address.
 */
export function clearRememberedEmail() {
    try {
        localStorage.removeItem(STORAGE_KEYS.rememberedEmail);
    } catch (error) {
        console.error("Unable to clear remembered email:", error);
    }
}

// --------------------------------------------
// LOGIN SESSION
// --------------------------------------------

/**
 * Save a successful demo login session.
 * Do not store passwords in the session.
 * @param {{id: number|string, name: string, email: string, role: string}} user
 */
export function saveSession(user) {
    if (!user || !user.email) {
        throw new Error("A valid user is required to create a session.");
    }

    const session = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "User",
        authenticated: true,
        loginTime: new Date().toISOString()
    };

    try {
        localStorage.setItem(
            STORAGE_KEYS.session,
            JSON.stringify(session)
        );
    } catch (error) {
        console.error("Unable to save login session:", error);
        throw new Error("Unable to save your login session.");
    }
}

/**
 * Retrieve the current demo login session.
 * @returns {object|null}
 */
export function getSession() {
    try {
        const storedSession = localStorage.getItem(STORAGE_KEYS.session);

        if (!storedSession) {
            return null;
        }

        const session = JSON.parse(storedSession);

        if (!session || session.authenticated !== true || !session.email) {
            clearSession();
            return null;
        }

        return session;
    } catch (error) {
        console.error("Unable to retrieve login session:", error);
        clearSession();
        return null;
    }
}

/**
 * Check whether a user is logged in.
 * @returns {boolean}
 */
export function isAuthenticated() {
    return getSession() !== null;
}

/**
 * Clear the current login session.
 */
export function clearSession() {
    try {
        localStorage.removeItem(STORAGE_KEYS.session);
    } catch (error) {
        console.error("Unable to clear login session:", error);
    }
}

/**
 * Log out the current user.
 * The remembered email is preserved.
 */
export function logout() {
    clearSession();
}

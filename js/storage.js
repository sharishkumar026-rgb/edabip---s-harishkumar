
/* =====================================================
   EDABIP — LOCAL STORAGE MANAGEMENT
   File: js/storage.js
   Day 3: Remember Me, session persistence and logout
   ===================================================== */

const STORAGE_KEYS = Object.freeze({
    rememberedEmail: "edabip_remembered_email",
    session: "edabip_session"
});


// =====================================================
// 1. REMEMBERED EMAIL
// =====================================================

/**
 * Save an email only when Remember Me is enabled.
 *
 * @param {string} email
 * @param {boolean} rememberMe
 */
export function saveRememberedEmail(email, rememberMe) {
    try {
        const normalizedEmail = String(email ?? "").trim();

        if (rememberMe && normalizedEmail) {
            localStorage.setItem(
                STORAGE_KEYS.rememberedEmail,
                normalizedEmail
            );
        } else {
            clearRememberedEmail();
        }
    } catch (error) {
        console.error(
            "EDABIP: Unable to save remembered email.",
            error
        );
    }
}

/**
 * Retrieve the remembered email address.
 *
 * @returns {string}
 */
export function getRememberedEmail() {
    try {
        return localStorage.getItem(
            STORAGE_KEYS.rememberedEmail
        ) || "";
    } catch (error) {
        console.error(
            "EDABIP: Unable to retrieve remembered email.",
            error
        );

        return "";
    }
}

/**
 * Remove the remembered email address.
 */
export function clearRememberedEmail() {
    try {
        localStorage.removeItem(STORAGE_KEYS.rememberedEmail);
    } catch (error) {
        console.error(
            "EDABIP: Unable to clear remembered email.",
            error
        );
    }
}


// =====================================================
// 2. LOGIN SESSION
// =====================================================

/**
 * Save a successful demo login session.
 * Passwords must never be stored in this session.
 *
 * @param {{
 *   id?: number|string,
 *   name?: string,
 *   email: string,
 *   role?: string
 * }} user
 */
export function saveSession(user) {
    if (
        !user ||
        typeof user.email !== "string" ||
        !user.email.trim()
    ) {
        throw new Error(
            "A valid user is required to create a session."
        );
    }

    const session = {
        id: user.id ?? user.email.trim(),
        name:
            typeof user.name === "string" && user.name.trim()
                ? user.name.trim()
                : "EDABIP User",
        email: user.email.trim().toLowerCase(),
        role:
            typeof user.role === "string" && user.role.trim()
                ? user.role.trim()
                : "User",
        authenticated: true,
        loginTime: new Date().toISOString()
    };

    try {
        localStorage.setItem(
            STORAGE_KEYS.session,
            JSON.stringify(session)
        );
    } catch (error) {
        console.error(
            "EDABIP: Unable to save login session.",
            error
        );

        throw new Error(
            "Unable to save your login session. Please try again."
        );
    }
}


// =====================================================
// 3. RETRIEVE AND VALIDATE SESSION
// =====================================================

/**
 * Retrieve the current demo session.
 *
 * @returns {{
 *   id: number|string,
 *   name: string,
 *   email: string,
 *   role: string,
 *   authenticated: boolean,
 *   loginTime: string
 * }|null}
 */
export function getSession() {
    let storedSession;

    try {
        storedSession = localStorage.getItem(
            STORAGE_KEYS.session
        );
    } catch (error) {
        console.error(
            "EDABIP: Unable to access the login session.",
            error
        );

        return null;
    }

    if (!storedSession) {
        return null;
    }

    try {
        const session = JSON.parse(storedSession);

        const validSession =
            session !== null &&
            typeof session === "object" &&
            session.authenticated === true &&
            typeof session.email === "string" &&
            session.email.trim() !== "" &&
            typeof session.name === "string" &&
            typeof session.role === "string" &&
            typeof session.loginTime === "string" &&
            !Number.isNaN(Date.parse(session.loginTime));

        if (!validSession) {
            clearSession();
            return null;
        }

        return session;
    } catch (error) {
        console.error(
            "EDABIP: Stored session contains invalid data.",
            error
        );

        clearSession();
        return null;
    }
}


// =====================================================
// 4. AUTHENTICATION STATUS
// =====================================================

/**
 * Check whether a valid demo session exists.
 *
 * @returns {boolean}
 */
export function isAuthenticated() {
    return getSession() !== null;
}


// =====================================================
// 5. CLEAR SESSION
// =====================================================

/**
 * Remove the current login session.
 * The remembered email remains unchanged.
 */
export function clearSession() {
    try {
        localStorage.removeItem(STORAGE_KEYS.session);
    } catch (error) {
        console.error(
            "EDABIP: Unable to clear login session.",
            error
        );
    }
}


// =====================================================
// 6. LOGOUT
// =====================================================

/**
 * Log out the current demo user.
 * Remember Me is preserved.
 */
export function logout() {
    clearSession();
}

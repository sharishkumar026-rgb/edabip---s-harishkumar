
/**
 * EDABIP — Authentication Types
 * File: src/types/auth.ts
 */

/** User information returned after successful login. */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

/** Credentials entered in the login form. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** User record loaded from the demo users JSON file. */
export interface ApiUser extends AuthUser {
  password: string;
}

/** Successful login response. */
export interface AuthResponse {
  user: AuthUser;
}

/** Shape of the session saved in localStorage. */
export interface StoredSession {
  user: AuthUser;
}

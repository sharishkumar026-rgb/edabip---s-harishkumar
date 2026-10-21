
import type {
  ApiUser,
  AuthResponse,
  LoginCredentials,
} from "../types/auth";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL as string | undefined
)?.replace(/\/+$/, "");

const USERS_URL = API_BASE_URL
  ? `${API_BASE_URL}/data/users.json`
  : "/data/users.json";

/**
 * Loads demo users from the public JSON file.
 */
async function loadUsers(): Promise<ApiUser[]> {
  let response: Response;

  try {
    response = await fetch(USERS_URL);
  } catch {
    throw new Error(
      "Unable to connect to user data. Start the Vite development server and try again."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Unable to load demo users (HTTP ${response.status}). Check public/data/users.json.`
    );
  }

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new Error("The user data file contains invalid JSON.");
  }

  if (!Array.isArray(data)) {
    throw new Error("The user data must be a JSON array.");
  }

  const users: ApiUser[] = [];

  for (const item of data) {
    if (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "name" in item &&
      "email" in item &&
      "password" in item &&
      "role" in item &&
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      typeof item.email === "string" &&
      typeof item.password === "string" &&
      typeof item.role === "string"
    ) {
      users.push({
        id: item.id,
        name: item.name,
        email: item.email,
        password: item.password,
        role: item.role,
      });
    }
  }

  if (users.length === 0) {
    throw new Error("No valid demo users were found in the JSON file.");
  }

  return users;
}

/**
 * Checks demo credentials and returns the authenticated user.
 */
export async function loginWithCredentials(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const email = credentials.email.trim().toLowerCase();
  const password = credentials.password;

  if (!email || !password) {
    throw new Error("Please enter your email and password.");
  }

  const users = await loadUsers();

  const matchedUser = users.find(
    (user) =>
      user.email.trim().toLowerCase() === email &&
      user.password === password
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password.");
  }

  return {
    user: {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
    },
  };
}


import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { loginWithCredentials } from "../api/authApi";
import type { AuthUser, StoredSession } from "../types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const SESSION_KEY = "edabip_react_session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readSession(): AuthUser | null {
  try {
    const storedValue = localStorage.getItem(SESSION_KEY);

    if (!storedValue) {
      return null;
    }

    const parsed: unknown = JSON.parse(storedValue);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("user" in parsed)
    ) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    const session = parsed as StoredSession;
    const savedUser = session.user;

    if (
      !savedUser ||
      typeof savedUser.id !== "string" ||
      typeof savedUser.name !== "string" ||
      typeof savedUser.email !== "string" ||
      typeof savedUser.role !== "string"
    ) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return savedUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readSession());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      setIsLoading(true);

      try {
        const response = await loginWithCredentials({ email, password });

        const session: StoredSession = {
          user: response.user,
        };

        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch {
          // Authentication still works for the current page session.
        }

        setUser(response.user);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Continue logging out if storage is unavailable.
    }

    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}

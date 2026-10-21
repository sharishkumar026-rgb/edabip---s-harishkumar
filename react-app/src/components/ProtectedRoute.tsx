
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Wait while authentication is being checked.
  if (isLoading) {
    return (
      <main className="auth-loading" role="status" aria-live="polite">
        <div className="auth-loading__spinner" aria-hidden="true" />
        <p>Checking authentication...</p>
      </main>
    );
  }

  // Redirect unauthenticated users to the login page.
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Allow authenticated users to access the protected page.
  return <Outlet />;
}

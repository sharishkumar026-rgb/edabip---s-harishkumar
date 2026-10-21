
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import LoginTabs from "../components/LoginTabs";
import LoginForm from "../components/LoginForm";
import SocialLogin from "../components/SocialLogin";
import { useAuth } from "../context/AuthContext";

type LoginTab = "email" | "sso";

interface LoginLocationState {
  from?: {
    pathname?: string;
  };
}

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<LoginTab>("email");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LoginLocationState | null;
  const redirectTo =
    locationState?.from?.pathname?.startsWith("/") &&
    locationState.from.pathname !== "/login"
      ? locationState.from.pathname
      : "/dashboard";

  async function handleLogin(
    email: string,
    password: string
  ): Promise<void> {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await login(email, password);

      setSuccessMessage("Login successful. Redirecting to your dashboard.");

      navigate(redirectTo, { replace: true });
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    }
  }

  function handleGoogleLogin(): void {
    setErrorMessage("Google sign-in is not configured yet.");
    setSuccessMessage("");
  }

  function handleMicrosoftLogin(): void {
    setErrorMessage("Microsoft sign-in is not configured yet.");
    setSuccessMessage("");
  }

  return (
    <AuthLayout>
      <div className="login-page-content">
        <div className="login-page-content__intro">
          <span className="login-page-content__eyebrow">
            SECURE WORKSPACE ACCESS
          </span>

          <h1>Welcome back.</h1>

          <p>
            Sign in to access your analytics workspace and business insights.
          </p>
        </div>

        <LoginTabs
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setErrorMessage("");
            setSuccessMessage("");
          }}
        />

        {activeTab === "email" ? (
          <>
            <LoginForm
              onSubmit={handleLogin}
              loading={isLoading}
              errorMessage={errorMessage}
              successMessage={successMessage}
            />

            <SocialLogin
              onGoogleLogin={handleGoogleLogin}
              onMicrosoftLogin={handleMicrosoftLogin}
              disabled={isLoading}
            />
          </>
        ) : (
          <section
            id="sso-panel"
            className="sso-panel"
            role="tabpanel"
            aria-labelledby="sso-tab"
          >
            <div className="sso-panel__icon" aria-hidden="true">
              ↗
            </div>

            <h2>Enterprise single sign-on</h2>

            <p>
              Use your organization's identity provider to access EDABIP.
            </p>

            <button
              type="button"
              className="sso-panel__button"
              disabled={isLoading}
              onClick={() => {
                setErrorMessage(
                  "Enterprise SSO is not configured yet. Contact your administrator."
                );
                setSuccessMessage("");
              }}
            >
              Continue with SSO
            </button>

            {errorMessage && (
              <p className="login-message login-message--error" role="alert">
                {errorMessage}
              </p>
            )}
          </section>
        )}
      </div>
    </AuthLayout>
  );
}


import { useState, type FormEvent } from "react";
import "./LoginForm.css";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  rememberedEmail?: string;
  onRememberEmailChange?: (email: string) => void;
  errorMessage?: string;
  successMessage?: string;
}

export default function LoginForm({
  onSubmit,
  loading = false,
  rememberedEmail = "",
  onRememberEmailChange,
  errorMessage = "",
  successMessage = "",
}: LoginFormProps) {
  const [email, setEmail] = useState(rememberedEmail);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail));
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    const normalizedEmail = email.trim();
    let isValid = true;

    if (!normalizedEmail) {
      setEmailError("Please enter your email address.");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (rememberMe) {
      onRememberEmailChange?.(normalizedEmail);
    } else {
      onRememberEmailChange?.("");
    }

    await onSubmit(normalizedEmail, password);
  }

  return (
    <form
      id="email-panel"
      className="login-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="login-field">
        <label htmlFor="login-email">Work email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "login-email-error" : undefined}
          disabled={loading}
        />
        {emailError && (
          <p className="login-field__error" id="login-email-error">
            {emailError}
          </p>
        )}
      </div>

      <div className="login-field">
        <div className="login-field__label-row">
          <label htmlFor="login-password">Password</label>
          <button
            className="login-form__text-button"
            type="button"
            onClick={() =>
              window.alert("Connect your password recovery page here.")
            }
          >
            Forgot password?
          </button>
        </div>

        <div className="login-form__password">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(passwordError)}
            aria-describedby={
              passwordError ? "login-password-error" : undefined
            }
            disabled={loading}
          />
          <button
            className="login-form__toggle"
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            disabled={loading}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {passwordError && (
          <p className="login-field__error" id="login-password-error">
            {passwordError}
          </p>
        )}
      </div>

      <label className="login-form__remember">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          disabled={loading}
        />
        <span>Remember me</span>
      </label>

      {errorMessage && (
        <p className="login-form__message login-form__message--error" role="alert">
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p className="login-form__message login-form__message--success" role="status">
          {successMessage}
        </p>
      )}

      <button
        className="login-form__submit"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in to your account"}
      </button>
    </form>
  );
}

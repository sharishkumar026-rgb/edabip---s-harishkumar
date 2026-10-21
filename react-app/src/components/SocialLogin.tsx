import "./SocialLogin.css";

interface SocialLoginProps {
  onGoogleLogin?: () => void;
  onMicrosoftLogin?: () => void;
  disabled?: boolean;
}

export default function SocialLogin({
  onGoogleLogin,
  onMicrosoftLogin,
  disabled = false,
}: SocialLoginProps) {
  return (
    <section className="social-login" aria-label="Other sign-in options">
      <div className="social-login__divider">
        <span>Or continue with</span>
      </div>

      <div className="social-login__buttons">
        <button
          type="button"
          className="social-login__button"
          onClick={onGoogleLogin}
          disabled={disabled}
        >
          <span className="social-login__google-icon" aria-hidden="true">
            G
          </span>
          <span>Google</span>
        </button>

        <button
          type="button"
          className="social-login__button"
          onClick={onMicrosoftLogin}
          disabled={disabled}
        >
          <span className="social-login__microsoft-icon" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>Microsoft</span>
        </button>
      </div>
    </section>
  );
}

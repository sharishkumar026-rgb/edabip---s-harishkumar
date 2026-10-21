import "./LoginFooter.css";

interface LoginFooterProps {
  year?: number;
}

export default function LoginFooter({
  year = new Date().getFullYear(),
}: LoginFooterProps) {
  return (
    <footer className="login-footer">
      <p className="login-footer__copyright">
        &copy; {year} EDABIP. All rights reserved.
      </p>

      <div className="login-footer__links">
        <a href="mailto:support@edabip.example">
          Contact support
        </a>

        <span aria-hidden="true" className="login-footer__separator">
          ·
        </span>

        <span className="login-footer__status">
          <span
            className="login-footer__status-dot"
            aria-hidden="true"
          />
          Systems operational
        </span>
      </div>
    </footer>
  );
}

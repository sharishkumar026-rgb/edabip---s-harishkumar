
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <header className="not-found-page__header">
        <BrandLogo />
      </header>

      <section className="not-found-page__content">
        <span className="not-found-page__eyebrow">
          EDABIP · PAGE NOT FOUND
        </span>

        <div className="not-found-page__code" aria-hidden="true">
          404
        </div>

        <h1>This page is off the charts.</h1>

        <p>
          The page you are looking for may have moved or does not exist.
          Return to the login page to continue to your workspace.
        </p>

        <button
          type="button"
          className="not-found-page__button"
          onClick={() => navigate("/login", { replace: true })}
        >
          <span aria-hidden="true">←</span>
          Back to login
        </button>
      </section>

      <footer className="not-found-page__footer">
        <span>© {new Date().getFullYear()} EDABIP</span>
        <span>Data. Clarity. Impact.</span>
      </footer>
    </main>
  );
}

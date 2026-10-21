
import { useNavigate } from "react-router-dom";

import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

import "./DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout(): void {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-page__header">
        <BrandLogo compact />

        <div className="dashboard-page__header-actions">
          <span className="dashboard-page__status">
            <span className="dashboard-page__status-dot" />
            Workspace
          </span>

          <button
            type="button"
            className="dashboard-page__logout"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="dashboard-page__content">
        <span className="dashboard-page__eyebrow">
          ENTERPRISE INTELLIGENCE PLATFORM
        </span>

        <h1>
          Welcome, {user?.name ?? "User"}.
          <br />
          <span>Your analytics workspace.</span>
        </h1>

        <p className="dashboard-page__description">
          You are signed in to EDABIP. Continue building your business
          intelligence experience here.
        </p>

        <div className="dashboard-page__cards">
          <article className="dashboard-page__card">
            <span className="dashboard-page__card-icon" aria-hidden="true">
              ↗
            </span>
            <h2>Analytics</h2>
            <p>Explore business performance and trends.</p>
            <span className="dashboard-page__coming-soon">
              Coming soon
            </span>
          </article>

          <article className="dashboard-page__card">
            <span className="dashboard-page__card-icon" aria-hidden="true">
              ◫
            </span>
            <h2>Reports</h2>
            <p>Prepare insights for business decisions.</p>
            <span className="dashboard-page__coming-soon">
              Coming soon
            </span>
          </article>

          <article className="dashboard-page__card">
            <span className="dashboard-page__card-icon" aria-hidden="true">
              ◎
            </span>
            <h2>Workspace</h2>
            <p>Your enterprise workspace starts here.</p>
            <span className="dashboard-page__coming-soon">
              Coming soon
            </span>
          </article>
        </div>

        <div className="dashboard-page__notice" role="status">
          <span aria-hidden="true">✓</span>
          You are signed in successfully.
        </div>
      </section>

      <footer className="dashboard-page__footer">
        <span>© {new Date().getFullYear()} EDABIP</span>
        <span>Data. Clarity. Impact.</span>
      </footer>
    </main>
  );
}

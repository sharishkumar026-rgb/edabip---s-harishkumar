import type { ReactNode } from "react";
import "./AuthLayout.css";
import BrandLogo from "../components/BrandLogo";
import DashboardPreview from "../components/DashboardPreview";
import LoginFooter from "../components/LoginFooter";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="auth-layout">
      <section className="auth-layout__left">
        <header className="auth-layout__header">
          <BrandLogo />
        </header>

        <div className="auth-layout__content">
          {children}
        </div>

        <LoginFooter />
      </section>

      <section className="auth-layout__right" aria-label="Platform overview">
        <DashboardPreview />

        <p className="auth-layout__caption">
          Intelligent analytics. Confident decisions.
        </p>
      </section>
    </main>
  );
}

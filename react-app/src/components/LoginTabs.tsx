import "./LoginTabs.css";

interface LoginTabsProps {
  activeTab: "email" | "sso";
  onTabChange: (tab: "email" | "sso") => void;
}

export default function LoginTabs({
  activeTab,
  onTabChange,
}: LoginTabsProps) {
  return (
    <div
      className="login-tabs"
      role="tablist"
      aria-label="Login method"
    >
      <button
        type="button"
        role="tab"
        id="email-tab"
        aria-selected={activeTab === "email"}
        aria-controls="email-panel"
        className={`login-tabs__button ${
          activeTab === "email" ? "is-active" : ""
        }`}
        onClick={() => onTabChange("email")}
      >
        Email &amp; Password
      </button>

      <button
        type="button"
        role="tab"
        id="sso-tab"
        aria-selected={activeTab === "sso"}
        aria-controls="sso-panel"
        className={`login-tabs__button ${
          activeTab === "sso" ? "is-active" : ""
        }`}
        onClick={() => onTabChange("sso")}
      >
        Enterprise SSO
      </button>
    </div>
  );
}

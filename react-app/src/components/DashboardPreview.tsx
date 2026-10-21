import "./DashboardPreview.css";
export default function DashboardPreview() {
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

  return (
    <aside className="dashboard-preview" aria-label="EDABIP analytics preview">
      <div className="dashboard-preview__top">
        <div className="dashboard-preview__eyebrow">
          <span className="dashboard-preview__live-dot" />
          BUSINESS INTELLIGENCE
        </div>

        <div className="dashboard-preview__badge">
          <span aria-hidden="true">✦</span> Live insights
        </div>
      </div>

      <div className="dashboard-preview__heading">
        <h2>
          DATA. CLARITY.
          <br />
          <span>IMPACT.</span>
        </h2>

        <p>
          Turn data into direction.
          <br />
          Make every decision count.
        </p>
      </div>

      <div className="dashboard-preview__metrics">
        <article className="preview-metric">
          <div className="preview-metric__top">
            <span className="preview-metric__label">Total revenue</span>
            <span className="preview-metric__icon" aria-hidden="true">
              $
            </span>
          </div>

          <p className="preview-metric__value">$2.48M</p>

          <p className="preview-metric__change">
            <span aria-hidden="true">↗</span> 12.8%
            <span className="preview-metric__period"> vs last month</span>
          </p>
        </article>

        <article className="preview-metric">
          <div className="preview-metric__top">
            <span className="preview-metric__label">Active users</span>
            <span className="preview-metric__icon" aria-hidden="true">
              ◎
            </span>
          </div>

          <p className="preview-metric__value">18,642</p>

          <p className="preview-metric__change">
            <span aria-hidden="true">↗</span> 8.4%
            <span className="preview-metric__period"> vs last month</span>
          </p>
        </article>
      </div>

      <section className="preview-chart" aria-label="Revenue trend from March to September">
        <div className="preview-chart__header">
          <div>
            <h3>Revenue overview</h3>
            <p>Monthly performance</p>
          </div>

          <span className="preview-chart__period">Last 7 months⌄</span>
        </div>

        <div className="preview-chart__chart">
          <div className="preview-chart__y-labels" aria-hidden="true">
            <span>$100k</span>
            <span>$75k</span>
            <span>$50k</span>
            <span>$25k</span>
            <span>$0</span>
          </div>

          <div className="preview-chart__plot">
            <div className="preview-chart__grid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <svg
              className="preview-chart__svg"
              viewBox="0 0 350 150"
              preserveAspectRatio="none"
              role="img"
              aria-label="Illustrative revenue trend increasing from March through September"
            >
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#39d9c3" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#39d9c3" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M 5 119 L 61 95 L 118 105 L 175 65 L 232 78 L 289 35 L 345 15 L 345 150 L 5 150 Z"
                fill="url(#revenueFill)"
              />

              <path
                d="M 5 119 L 61 95 L 118 105 L 175 65 L 232 78 L 289 35 L 345 15"
                fill="none"
                stroke="#39d9c3"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {[ 
                [5, 119],
                [61, 95],
                [118, 105],
                [175, 65],
                [232, 78],
                [289, 35],
                [345, 15],
              ].map(([cx, cy]) => (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="#0d1422"
                  stroke="#39d9c3"
                  strokeWidth="2"
                />
              ))}
            </svg>

            <div className="preview-chart__months">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-chart__legend">
          <span className="preview-chart__legend-dot" />
          Revenue growth
          <span className="preview-chart__legend-note">Illustrative data</span>
        </div>
      </section>

      <div className="dashboard-preview__bottom">
        <span className="dashboard-preview__bottom-icon" aria-hidden="true">
          ✓
        </span>
        <span>Decisions backed by data</span>
        <span className="dashboard-preview__bottom-stars" aria-hidden="true">
          ✦
        </span>
      </div>
    </aside>
  );
}

import "./BrandLogo.css";

interface BrandLogoProps {
  compact?: boolean;
}

export default function BrandLogo({
  compact = false,
}: BrandLogoProps) {
  return (
    <div className={`brand-logo${compact ? " brand-logo--compact" : ""}`}>
      <div className="brand-logo__symbol" aria-hidden="true">
        E
      </div>

      <div className="brand-logo__text">
        <span className="brand-logo__name">EDABIP</span>

        {!compact && (
          <span className="brand-logo__subtitle">
            INTELLIGENCE PLATFORM
          </span>
        )}
      </div>
    </div>
  );
}

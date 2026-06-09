import "./InfoCard.css";

type InfoCardProps = {
  icon?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  highlight?: "green" | "gold" | "red" | "blue" | "none";
  onClick?: () => void;
};

export default function InfoCard({
  icon,
  title,
  value,
  subtitle,
  highlight = "none",
  onClick,
}: InfoCardProps) {
  const highlightClass = highlight !== "none" ? ` info-card--${highlight}` : "";

  return (
    <div className={`info-card${highlightClass}`} onClick={onClick} role={onClick ? "button" : undefined}>
      {icon && <span className="info-card__icon">{icon}</span>}
      <div className="info-card__content">
        <p className="info-card__title">{title}</p>
        <p className="info-card__value">{value}</p>
        {subtitle && <p className="info-card__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

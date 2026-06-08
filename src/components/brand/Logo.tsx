import { Link } from "react-router-dom";
import { BRAND } from "../../data/brand";
import "./Logo.css";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showSlogan?: boolean;
  linkTo?: string;
};

export default function Logo({ size = "md", showSlogan = false, linkTo = "/" }: LogoProps) {
  const content = (
    <>
      <svg
        className="logo__mark"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="48" height="48" rx="12" fill="#0a0e17" />
        <path
          d="M8 34 L24 10 L40 34 Z"
          fill="url(#logoGrad)"
          opacity="0.95"
        />
        <circle cx="24" cy="30" r="6" fill="#ffd700" />
        <path
          d="M20 28 Q24 24 28 28"
          stroke="#0a0e17"
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="logoGrad" x1="8" y1="34" x2="40" y2="10">
            <stop stopColor="#00ff87" />
            <stop offset="1" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="logo__text-wrap">
        <span className="logo__name">
          Bet<span className="logo__accent">Show</span>
        </span>
        {showSlogan && (
          <span className="logo__slogan">{BRAND.slogan} · {BRAND.tagline}</span>
        )}
      </div>
    </>
  );

  return (
    <Link to={linkTo} className={`logo logo--${size}`} aria-label={`${BRAND.name} início`}>
      {content}
    </Link>
  );
}

import type { ReactNode } from "react";
import "./Avatar.css";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarRing = "green" | "gold" | "cyan" | "magenta" | "none";

type AvatarProps = {
  src: string;
  alt: string;
  size?: AvatarSize;
  ring?: AvatarRing;
  className?: string;
};

export default function Avatar({
  src,
  alt,
  size = "md",
  ring = "green",
  className = "",
}: AvatarProps) {
  return (
    <span
      className={`avatar avatar--${size} avatar--ring-${ring} ${className}`.trim()}
      role="img"
      aria-label={alt}
    >
      <img src={src} alt="" />
    </span>
  );
}

type AvatarGroupProps = {
  avatars: { src: string; alt: string }[];
  label?: ReactNode;
  extraCount?: number;
};

export function AvatarGroup({ avatars, label, extraCount }: AvatarGroupProps) {
  return (
    <div className="avatar-group">
      <div className="avatar-group__stack" aria-hidden>
        {avatars.map((a) => (
          <Avatar key={a.src} src={a.src} alt={a.alt} size="sm" ring="green" />
        ))}
        {extraCount !== undefined && extraCount > 0 && (
          <span className="avatar-group__more">+{extraCount}</span>
        )}
      </div>
      {label && <p className="avatar-group__label">{label}</p>}
    </div>
  );
}

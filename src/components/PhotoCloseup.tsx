import type { ReactNode } from "react";
import "./PhotoCloseup.css";

type FadeSide = "left" | "right" | "bottom";
type Tint = "green" | "gold" | "magenta" | "none";
type Ring = "cta" | "gold" | "magenta" | "none";

type PhotoCloseupProps = {
  src: string;
  alt: string;
  height?: number | string;
  fades?: FadeSide[];
  tint?: Tint;
  ring?: Ring;
  className?: string;
  children?: ReactNode;
};

export default function PhotoCloseup({
  src,
  alt,
  height = 420,
  fades = ["left", "bottom"],
  tint = "green",
  ring = "none",
  className = "",
  children,
}: PhotoCloseupProps) {
  const h = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`photo-closeup photo-closeup--ring-${ring} ${className}`.trim()}
      style={{ ["--photo-h" as string]: h }}
    >
      <div className="photo-closeup__inner">
        <img src={src} alt={alt} loading="lazy" />
        {fades.includes("left") && <div className="photo-fade photo-fade--left" aria-hidden />}
        {fades.includes("right") && <div className="photo-fade photo-fade--right" aria-hidden />}
        {fades.includes("bottom") && <div className="photo-fade photo-fade--bottom" aria-hidden />}
        {tint !== "none" && (
          <div className={`photo-tint photo-tint--${tint}`} aria-hidden />
        )}
        {children && <div className="photo-closeup__content">{children}</div>}
      </div>
    </div>
  );
}

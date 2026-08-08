import { useTheme } from "../contexts/ThemeContext";
import "./ThemeToggle.css";

type ThemeToggleProps = {
  compact?: boolean;
};

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { resolved, toggle } = useTheme();
  const isLight = resolved === "light";

  return (
    <button
      type="button"
      className={`theme-toggle${compact ? " theme-toggle--compact" : ""}`}
      onClick={toggle}
      aria-label={isLight ? "Ativar tema escuro" : "Ativar tema claro"}
      title={isLight ? "Tema escuro" : "Tema claro"}
    >
      <span className="theme-toggle__icon" aria-hidden>
        {isLight ? "🌙" : "☀️"}
      </span>
      {!compact && (
        <span className="theme-toggle__label">{isLight ? "Escuro" : "Claro"}</span>
      )}
    </button>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./brand/Logo";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

const NAV = [
  { label: "Copa 2026", href: "/#copa2026" },
  { label: "Esportes", href: "/#esportes" },
  { label: "Calendário", href: "/#calendario" },
  { label: "Bônus", href: "/#bonus" },
  { label: "Odds ao vivo", href: "/#odds" },
];

const SCROLL_THRESHOLD = 24;
const MOBILE_MAX = 900;

function getScrollY() {
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function getViewportWidth() {
  const vv = window.visualViewport?.width;
  const inner = window.innerWidth || 0;
  const client = document.documentElement.clientWidth || 0;
  const values = [inner, client, vv].filter((n): n is number => typeof n === "number" && n > 0);
  return values.length ? Math.min(...values) : inner;
}

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(() => getScrollY() > SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? getViewportWidth() <= MOBILE_MAX : false
  );

  useEffect(() => {
    const onScroll = () => setScrolled(getScrollY() > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncDevice = () => {
      const mobile = getViewportWidth() <= MOBILE_MAX;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        document.body.classList.remove("menu-lock");
      }
    };

    syncDevice();
    // Pequeno delay cobre troca de device no DevTools
    const t = window.setTimeout(syncDevice, 50);

    const media = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    media.addEventListener("change", syncDevice);
    window.addEventListener("resize", syncDevice);
    window.addEventListener("orientationchange", syncDevice);
    window.visualViewport?.addEventListener("resize", syncDevice);

    return () => {
      window.clearTimeout(t);
      media.removeEventListener("change", syncDevice);
      window.removeEventListener("resize", syncDevice);
      window.removeEventListener("orientationchange", syncDevice);
      window.visualViewport?.removeEventListener("resize", syncDevice);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-lock", menuOpen && isMobile);
    return () => document.body.classList.remove("menu-lock");
  }, [menuOpen, isMobile]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  const userFirstName =
    user?.fullName?.trim().split(/\s+/)[0] ||
    user?.email?.split("@")[0] ||
    "usuário";
  const accountLabel = `Olá, ${userFirstName}`;
  const accountPath = user?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <header
      className={[
        "header",
        scrolled ? "header--scrolled" : "",
        isMobile ? "header--mobile" : "",
        menuOpen ? "header--menu-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="header__inner container">
        <Logo size={isMobile ? "sm" : "md"} />

        {!isMobile && (
          <nav className="header__nav" aria-label="Principal">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="header__link">
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="header__actions">
          {/* No mobile NÃO renderiza Entrar/Cadastrar na barra — evita corte em 375px */}
          {!isMobile &&
            (isAuthenticated ? (
              <>
                <Link
                  to={accountPath}
                  className="btn btn-outline header__user-btn"
                  title={user?.fullName || accountLabel}
                >
                  {accountLabel}
                </Link>
                <button type="button" className="btn btn-primary" onClick={logout}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Entrar
                </Link>
                <Link to="/cadastro" className="btn btn-primary">
                  Cadastrar
                </Link>
              </>
            ))}

          {isMobile && (
            <>
              {isAuthenticated && (
                <Link
                  to={accountPath}
                  className="btn btn-outline header__user-btn header__user-btn--mobile"
                  title={user?.fullName || accountLabel}
                >
                  {accountLabel}
                </Link>
              )}
              <button
                type="button"
                className={`header__burger${menuOpen ? " header__burger--open" : ""}`}
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </>
          )}
        </div>
      </div>

      {isMobile && (
        <>
          <div
            className={`header__backdrop${menuOpen ? " header__backdrop--visible" : ""}`}
            onClick={closeMenu}
            aria-hidden
          />

          <div
            id="mobile-menu"
            className={`header__mobile${menuOpen ? " header__mobile--open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <nav className="header__mobile-nav" aria-label="Menu mobile">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="header__mobile-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="header__mobile-actions">
              {isAuthenticated ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Sair
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
                    Entrar
                  </Link>
                  <Link to="/cadastro" className="btn btn-primary" onClick={closeMenu}>
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

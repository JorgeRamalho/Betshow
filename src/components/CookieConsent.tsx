import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CookieConsent.css";

const CONSENT_KEY = "betshow_cookie_consent";

type ConsentValue = "accepted" | "essential" | "custom";

type CookiePrefs = {
  performance: boolean;
  marketing: boolean;
};

const DEFAULT_PREFS: CookiePrefs = {
  performance: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function saveConsent(value: ConsentValue, nextPrefs?: CookiePrefs) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      if (nextPrefs) {
        localStorage.setItem("betshow_cookie_prefs", JSON.stringify(nextPrefs));
      }
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
    setShowSettings(false);
  }

  function saveSettings() {
    const allOptional = prefs.performance && prefs.marketing;
    const noneOptional = !prefs.performance && !prefs.marketing;

    if (allOptional) {
      saveConsent("accepted", prefs);
      return;
    }

    if (noneOptional) {
      saveConsent("essential", prefs);
      return;
    }

    saveConsent("custom", prefs);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-live="polite"
    >
      <div className={`cookie-consent__inner${showSettings ? " cookie-consent__inner--settings" : ""}`}>
        <div className="cookie-consent__text">
          <h2 id="cookie-consent-title">
            {showSettings ? "Configurações de cookies" : "Cookies e privacidade"}
          </h2>
          {!showSettings ? (
            <p>
              Usamos cookies essenciais para o funcionamento do site e, com sua
              permissão, cookies de desempenho e preferências. Veja a{" "}
              <Link to="/cookies">Política de Cookies</Link> e a{" "}
              <Link to="/privacidade">Política de Privacidade</Link>.
            </p>
          ) : (
            <div className="cookie-consent__settings">
              <label className="cookie-consent__option">
                <input type="checkbox" checked disabled />
                <span>
                  <strong>Essenciais</strong>
                  <small>Necessários para login, segurança e navegação. Sempre ativos.</small>
                </span>
              </label>
              <label className="cookie-consent__option">
                <input
                  type="checkbox"
                  checked={prefs.performance}
                  onChange={(e) =>
                    setPrefs((prev) => ({ ...prev, performance: e.target.checked }))
                  }
                />
                <span>
                  <strong>Desempenho</strong>
                  <small>Ajudam a medir uso e melhorar a experiência do site.</small>
                </span>
              </label>
              <label className="cookie-consent__option">
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) =>
                    setPrefs((prev) => ({ ...prev, marketing: e.target.checked }))
                  }
                />
                <span>
                  <strong>Marketing</strong>
                  <small>Usados para ofertas e campanhas, apenas com sua permissão.</small>
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="cookie-consent__actions">
          {!showSettings ? (
            <>
              <button
                type="button"
                className="btn btn-outline cookie-consent__btn"
                onClick={() => setShowSettings(true)}
              >
                Configurações de cookies
              </button>
              <button
                type="button"
                className="btn btn-primary cookie-consent__btn"
                onClick={() => saveConsent("accepted", { performance: true, marketing: true })}
              >
                Aceitar cookies
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline cookie-consent__btn"
                onClick={() => setShowSettings(false)}
              >
                Voltar
              </button>
              <button
                type="button"
                className="btn btn-primary cookie-consent__btn"
                onClick={saveSettings}
              >
                Salvar preferências
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

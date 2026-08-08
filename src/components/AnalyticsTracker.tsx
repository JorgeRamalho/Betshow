import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../services/analytics";

/** Rastreia page views SPA e reage a mudanças de consentimento de cookies */
export default function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    initAnalytics();

    const onConsent = () => {
      initAnalytics();
      trackPageView(pathname, document.title);
    };

    window.addEventListener("betshow:consent", onConsent);
    return () => window.removeEventListener("betshow:consent", onConsent);
  }, [pathname]);

  useEffect(() => {
    trackPageView(pathname, document.title);
  }, [pathname]);

  return null;
}

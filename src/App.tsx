import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppRouter from "./routes/AppRouter";
import CookieConsent from "./components/CookieConsent";
import SkipLink from "./components/SkipLink";
import AnalyticsTracker from "./components/AnalyticsTracker";

/** GitHub Pages publica em /Betshow/ (nome do repo); Netlify usa a raiz. */
function getRouterBasename(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const { hostname, pathname } = window.location;
  if (hostname.endsWith("github.io") && pathname.toLowerCase().startsWith("/betshow")) {
    return "/Betshow";
  }
  return undefined;
}

export default function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <ThemeProvider>
        <AuthProvider>
          <SkipLink />
          <AnalyticsTracker />
          <AppRouter />
          <CookieConsent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

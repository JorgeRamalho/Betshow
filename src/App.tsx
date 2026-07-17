import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
import CookieConsent from "./components/CookieConsent";

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
      <AuthProvider>
        <AppRouter />
        <CookieConsent />
      </AuthProvider>
    </BrowserRouter>
  );
}

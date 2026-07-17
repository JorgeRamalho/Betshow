import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        <CookieConsent />
      </AuthProvider>
    </BrowserRouter>
  );
}

import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PaymentPage from "../pages/payment/PaymentPage";
import UserDashboardPage from "../pages/user/UserDashboardPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicyPage";
import CookiesPolicyPage from "../pages/legal/CookiesPolicyPage";
import TermsOfUsePage from "../pages/legal/TermsOfUsePage";
import ResponsibleGamingPage from "../pages/legal/ResponsibleGamingPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/pagamento" element={<PaymentPage />} />
      <Route path="/termos" element={<TermsOfUsePage />} />
      <Route path="/privacidade" element={<PrivacyPolicyPage />} />
      <Route path="/cookies" element={<CookiesPolicyPage />} />
      <Route path="/jogo-responsavel" element={<ResponsibleGamingPage />} />
      <Route path="/dashboard" element={<UserDashboardPage />} />
      <Route path="/dashboard/apostas" element={<UserDashboardPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/apostas" element={<AdminDashboardPage />} />
      <Route path="/admin/usuarios" element={<AdminDashboardPage />} />
    </Routes>
  );
}

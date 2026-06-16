import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { normalizeStaticPath } from "./utils/normalizeStaticPath";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/forms.css";
import "./styles/dashboard.css";

normalizeStaticPath();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

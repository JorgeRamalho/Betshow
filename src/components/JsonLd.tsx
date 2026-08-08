import { useEffect } from "react";
import { buildHomeStructuredData, buildPageStructuredData } from "../utils/structuredData";
import { getFullTitle } from "../data/seo";

const SCRIPT_ID = "betshow-json-ld";

type JsonLdProps = {
  pageTitle: string;
  description: string;
  pathname: string;
  variant?: "home" | "page";
};

export default function JsonLd({
  pageTitle,
  description,
  pathname,
  variant = "page",
}: JsonLdProps) {
  useEffect(() => {
    const data =
      variant === "home"
        ? buildHomeStructuredData()
        : buildPageStructuredData(pathname, getFullTitle(pageTitle), description);

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      script?.remove();
    };
  }, [pageTitle, description, pathname, variant]);

  return null;
}

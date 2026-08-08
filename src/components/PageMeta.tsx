import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import JsonLd from "./JsonLd";
import {
  DEFAULT_DESCRIPTION,
  getCanonicalUrl,
  getFullTitle,
  getOgImageUrl,
} from "../data/seo";

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

type PageMetaProps = {
  title: string;
  description?: string;
};

export default function PageMeta({ title, description = DEFAULT_DESCRIPTION }: PageMetaProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = getFullTitle(title);
    const url = getCanonicalUrl(pathname);
    const image = getOgImageUrl();

    document.title = fullTitle;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:image:width", "1200");
    setMetaTag("property", "og:image:height", "630");
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:locale", "pt_BR");
    setMetaTag("property", "og:site_name", "BetShow");
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);
    setLinkTag("canonical", url);
  }, [title, description, pathname]);

  return (
    <JsonLd
      pageTitle={title}
      description={description}
      pathname={pathname}
      variant={title === "Início" ? "home" : "page"}
    />
  );
}

export { DEFAULT_DESCRIPTION };

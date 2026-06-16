/**
 * Ajusta a URL quando o build é servido via Live Server ou caminhos com /dist/.
 * BrowserRouter só reconhece "/" — sem isso a página fica em branco.
 */
export function normalizeStaticPath() {
  if (typeof window === "undefined") return;

  let path = window.location.pathname;

  if (path.endsWith("/index.html")) {
    path = path.slice(0, -"/index.html".length) || "/";
  }

  if (path === "/dist" || path.startsWith("/dist/")) {
    path = path.slice("/dist".length) || "/";
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (path !== window.location.pathname) {
    const { search, hash } = window.location;
    window.history.replaceState(null, "", path + search + hash);
  }
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import type { Plugin } from "vite";
import { routeMeta, SITE } from "./scripts/routeMeta";

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function routePreviews(): Plugin {
  return {
    name: "route-previews",
    apply: "build",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const base = fs.readFileSync(path.join(dist, "index.html"), "utf8");
      for (const [route, m] of Object.entries(routeMeta)) {
        const url = SITE + route;
        const html = base
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(m.description)}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(m.title)}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(m.description)}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(m.title)}`)
          .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(m.description)}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
        const dir = path.join(dist, route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), html);
      }
    },
  };
}

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), routePreviews()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import type { Plugin } from "vite";
import { routeMeta } from "./scripts/routeMeta";
import { renderRouteHtml } from "./scripts/renderRouteHtml";

function routePreviews(): Plugin {
  return {
    name: "route-previews",
    transformIndexHtml(html, context) {
      const route = context.path.replace(/\/$/, '') || '/';
      return context.server ? renderRouteHtml(html, route) : html;
    },
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const base = fs.readFileSync(path.join(dist, "index.html"), "utf8");
      for (const route of Object.keys(routeMeta)) {
        const html = renderRouteHtml(base, route);
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

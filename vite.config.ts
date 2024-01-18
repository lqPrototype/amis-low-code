import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          // amis用到了：装饰器和class
          plugins: ["decorators-legacy", "classProperties"],
        },
      },
    }),
    // Then SVG files can be imported as React components:
    svgr(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8888,
    proxy: {
      "/api": {
        target: "http://localhost:3001", // 代理本地
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

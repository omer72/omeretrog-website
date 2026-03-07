/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/omeretrog-website/" : "/",
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://omer72.github.io/omeretrog-website",
      dynamicRoutes: ["/", "/work", "/about", "/contact"],
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
});

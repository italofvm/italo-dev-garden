import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === "production",
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendors
          "react-vendor": ["react", "react-dom"],
          "socket-vendor": ["socket.io-client"],
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Otimizações de performance
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        // Estratégia de code splitting
        manualChunks: {
          // Vendors
          react: ["react", "react-dom"],
          socketio: ["socket.io-client"],
          // Componentes grandes
          sections: [
            "./src/components/sections/HomeSection.tsx",
            "./src/components/sections/ProjectsSection.tsx",
            "./src/components/sections/GardenSection.tsx",
            "./src/components/sections/LabSection.tsx",
            "./src/components/sections/NowSection.tsx",
          ],
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

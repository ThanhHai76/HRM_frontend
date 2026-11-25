import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command }) => ({
  // Giữ đường dẫn như bản Vue CLI cũ: bản build chạy dưới /HRM_frontend/ (GitHub Pages)
  base: command === "build" ? "/HRM_frontend/" : "/",
  plugins: [vue()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // Giữ tên biến môi trường cũ (VUE_APP_*) trong các file .env, đồng thời hỗ trợ VITE_*
  envPrefix: ["VITE_", "VUE_APP_"],
  server: { port: 8080 },
  preview: { port: 8080 },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1500,
  },
}));

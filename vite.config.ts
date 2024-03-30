import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
    proxy: {
      "/tieba": {
        target: "https://tiebac.baidu.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/tieba/, ""),
      },
      "/portrait": {
        target: "http://tb.himg.baidu.com/sys/portraitn/item/",
        secure: true,
        rewrite: (path) => path.replace("/^\\/portrait", ""),
      },
      "/forum": {
        target: "https://tiebapic.baidu.com/",
        secure: true,
      },
    },
  },
}));

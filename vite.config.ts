import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import polyfillNode from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [polyfillNode(), vue()],
  optimizeDeps: {
    exclude: ["dragula"], // <- modules that needs shimming have to be excluded from dep optimization
  },
});

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.node.json",
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: "./src/plugin/index.ts",
      name: "index",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    commonjsOptions: {
      esmExternals: ["react"],
    },
  },
});

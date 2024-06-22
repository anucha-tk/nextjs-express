import { defineConfig } from "vite";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@response": path.resolve(__dirname, "src/common/response"),
      "@error": path.resolve(__dirname, "src/common/error"),
      "@helpers": path.resolve(__dirname, "src/common/helpers"),
      "@middlewares": path.resolve(__dirname, "src/common/middlewares"),
      src: path.resolve(__dirname, "src"),
    },
  },
  test: {
    // when enable can use systex like jest eg. describe(), it()
    // if disable just import direct systex from vitest
    globals: true,
    environment: "node",
    setupFiles: path.resolve(__dirname, "./tests/helpers/setup.ts"),
    coverage: {
      reporter: ["html"],
    },
  },
  plugins: [
    AutoImport({
      imports: ["vitest"],
      dts: true, // generate TypeScript declaration
    }),
  ],
});

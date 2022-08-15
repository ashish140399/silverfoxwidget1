import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";
import url from "@rollup/plugin-url";
import pkg from "./package.json";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.tsx",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
  ],
  plugins: [url(), scss(), json(), typescript()],
};

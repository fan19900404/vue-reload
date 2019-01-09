import fs from "fs";
import rollupTypescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
// import builtins from 'rollup-plugin-node-builtins';

import { name, version, author, types } from "./package.json";

const dts = fs.readFileSync(types, "utf8");
fs.writeFileSync(types, dts.replace("export default", "export ="), "utf8");

const banner = `
/*!
* ${name} v${version}
* (c) 2017-${new Date().getFullYear()} ${author}
* Released under the MIT License.
*/
`.trim();

export default [
  {
    // npm引入
    input: "./src/main.ts",
    external: ["qs"],
    output: {
      file: `./dist/${name}.cjs.js`,
      format: "cjs",
      banner
    },
    plugins: [rollupTypescript()]
  },
  {
    // 未压缩es3
    input: "./src/main.ts",
    output: {
      file: `./dist/${name}.js`,
      format: "iife",
      name: "vueReload",
      banner
    },
    plugins: [
      rollupTypescript({
        target: "es5"
      }),
      // builtins(),
      nodeResolve(),
      commonjs({
        // namedExports: { qs: ["parse", "stringify"] }
      })
    ]
  },
  {
    // 浏览器es3引入，压缩版
    input: "./src/main.ts",
    output: {
      file: `./dist/${name}.min.js`,
      format: "iife",
      name: "vueReload",
      sourcemap: true
    },
    plugins: [
      rollupTypescript({
        target: "es5"
      }),
      // builtins(),
      nodeResolve(),
      commonjs({
        // namedExports: { qs: ["parse", "stringify"] }
      }),
      uglify({
        output: {
          preamble: banner,
          ie8: true,
        },
      })
    ]
  }
];

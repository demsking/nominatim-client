import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'lib/nominatim.browser.js',
    output: {
      name: 'nominatim',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'lib/nominatim.node.js',
    external: ['https'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      commonjs(),
    ],
  },
];

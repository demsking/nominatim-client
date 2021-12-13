import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const BANNER = `/* ${pkg.name} v${pkg.version} (c) ${pkg.author} - ${pkg.license} */`;
const terserPlugin = terser({
  compress: true,
  output: {
    comments: new RegExp(`^ ${pkg.name}`)
  },
});

export default [
  // browser-friendly UMD build
  {
    input: 'lib/nominatim.browser.js',
    output: {
      name: 'nominatim',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      banner: BANNER,
    },
    plugins: [
      resolve(),
      commonjs(),
      terserPlugin,
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'lib/nominatim.node.js',
    external: ['https'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true, banner: BANNER },
      { file: pkg.module, format: 'es', sourcemap: true, banner: BANNER },
    ],
    plugins: [
      commonjs(),
      terserPlugin,
    ],
  },
];

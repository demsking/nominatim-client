import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const BANNER = `/* ${pkg.name} v${pkg.version} (c) ${pkg.author} - ${pkg.license} */`;

export default [
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'lib/nominatim.js',
    external: ['https'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true, banner: BANNER },
      { file: pkg.module, format: 'es', sourcemap: true, banner: BANNER },
    ],
    plugins: [
      commonjs(),
      terser({
        compress: true,
        output: {
          comments: new RegExp(`^ ${pkg.name}`)
        },
      }),
    ],
  },
];

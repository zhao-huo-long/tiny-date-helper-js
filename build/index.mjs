import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default {
  input: { 'index': 'dist/index.js',},
  output: {
    format: 'cjs',
    dir: 'dist',
    name: 'dateHelper',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external: [
    'tiny-date-helper-js',
    /node_modules/
  ],
  plugins: [
    // typescript({}),
    nodeResolve({}),
    babel(
      {
        presets: ["@babel/preset-env",],
        babelHelpers: "runtime",
        plugins: ["@babel/plugin-transform-runtime"]
      })
  ]
};

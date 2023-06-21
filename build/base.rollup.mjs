import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  external: [
    'tiny-date-helper-js',
    /node_modules/
  ],
  plugins: [
    nodeResolve({}),
    babel(
      {
        presets: ["@babel/preset-env",],
        babelHelpers: "runtime",
        plugins: ["@babel/plugin-transform-runtime"]
      })
  ]
}
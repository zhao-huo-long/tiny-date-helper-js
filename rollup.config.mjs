import { babel } from '@rollup/plugin-babel';
/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default {
  input: 'lib/index.js',
  output: {
    format: 'cjs',
    dir: 'dist',
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  plugins: [
    babel(
      {
        presets: ["@babel/preset-env",],
        babelHelpers: "runtime",
        plugins: ["@babel/plugin-transform-runtime"]
      })
  ]
};

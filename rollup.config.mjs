import { babel } from '@rollup/plugin-babel';
/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default {
  input: ['js/lib/index.js', 'js/plugins/add.js'],
  output: {
    format: 'cjs',
    dir: 'dist',
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  external: [
    'tiny-date-helper-js'
  ],
  plugins: [
    babel(
      {
        presets: ["@babel/preset-env",],
        babelHelpers: "runtime",
        plugins: ["@babel/plugin-transform-runtime"]
      })
  ]
};

import base from './base.rollup.mjs'

/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default {
  input: { 'index': 'dist/index.js',},
  output: {
    format: 'umd',
    dir: '.',
    name: 'dateHelper',
    preserveModules: false,
    preserveModulesRoot: 'src',
  },
  ...base,
};

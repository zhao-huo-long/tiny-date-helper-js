import base from './base.rollup.mjs'

/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default {
  input: { 'plugins/add': 'dist/plugins/add',},
  output: {
    format: 'umd',
    dir: '.',
    name: 'dateHelper',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  ...base,
};

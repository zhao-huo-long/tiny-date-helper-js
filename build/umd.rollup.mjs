import base from './base.rollup.mjs'
import deepMerge from 'deepmerge'
import terser from '@rollup/plugin-terser';

/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default deepMerge(base({ format: 'umd', pluginsInputs: [], }), {
  output: {
    preserveModules: false,
    inlineDynamicImports: true
  },
  plugins: [terser()]
});

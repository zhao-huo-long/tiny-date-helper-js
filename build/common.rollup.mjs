import base from './base.rollup.mjs'
import deepMerge from 'deepmerge'

/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default deepMerge(base({format: 'commonjs', dir: 'dist'}), {});


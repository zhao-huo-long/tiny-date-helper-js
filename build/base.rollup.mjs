import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const plugins = {
  'plugins/add': 'src/plugins/add.ts',
}

/**
 * china official website url: https://cn.rollupjs.org/
 * plugin list website url: https://github.com/rollup/plugins
 */
export default (config = {}) => {
  const { format, dir, pluginsInputs = plugins} = config
  return {
    input: {
      'index': 'src/index.ts',
      ...pluginsInputs,
    },
    external: [
      'tiny-date-helper-js',
      /node_modules/
    ],
    output: {
      format: format,
      dir: dir || format,
      name: 'dateHelper',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      nodeResolve({}),
      typescript({ outDir: dir || format }),
      babel(
        {
          presets: ["@babel/preset-env",],
          babelHelpers: "runtime",
          plugins: ["@babel/plugin-transform-runtime"]
        })
    ]
  }
}
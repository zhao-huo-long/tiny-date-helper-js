import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const plugins = {
  'plugins/isSameDay': 'src/plugins/isSameDay.ts',
  'plugins/endOf': 'src/plugins/endOf.ts',
  'plugins/add': 'src/plugins/add.ts',
  'plugins/calendar': 'src/plugins/calendar.ts',
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
      'tiny-time-js',
    ],
    output: {
      format: format,
      dir: dir || format,
      name: 'timejs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      nodeResolve({}),
      typescript({ outDir: dir || format }),
      babel(
        {
          presets: ["@babel/preset-env",],
          babelHelpers: "bundled",
        })
    ]
  }
}
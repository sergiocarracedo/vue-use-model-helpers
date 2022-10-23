import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'

import pkg from './package.json'

const external = ['vue-demi']

const plugins = [
  typescript(),
  babel({ babelHelpers: 'bundled' })
]

export default [
  {
    plugins,
    external,
    input: 'src/index.ts',
    output: [
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
      {
        exports: 'named',
        format: 'cjs',
        file: pkg.main
      },
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'VueUseModelHelpers',
        sourcemap: true,
        globals: {
          'vue-demi': 'VueDemi',
        },
      }
    ]
  }
]

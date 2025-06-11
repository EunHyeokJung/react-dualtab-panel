import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import path from 'path';

import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    alias({
      entries: [
        { find: '@', replacement: path.resolve('src') },
        { find: '@assets', replacement: path.resolve('src/assets') },
        { find: '@common', replacement: path.resolve('src/components/common') },
      ]
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      exclude: ['**/*.stories.*', '**/*.test.*', 'src/demo/**/*', 'src/main.tsx'],
    }),
    postcss({
      extract: true,
      minimize: true,
    }),
    dts(),
  ],
  external: ['react', 'react-dom'],
}; 
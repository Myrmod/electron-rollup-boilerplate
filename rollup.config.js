import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

export default [
   // electron
   {
      input: 'src/main.ts',
      output: [
         {
            file: 'build/main.js',
            format: 'cjs',
            sourcemap: true
         },
      ],
      plugins: [
         nodeResolve(),
         typescript(),
         commonjs({
            include: './node_modules/**',
         }),
         copy({
            targets: [
               { src: './src/index.html', dest: './build' }
            ]
         }),
      ]
   },
   // react
   {
      input: 'src/react/index.tsx',
      output: [
         {
            file: 'build/scripts.js',
            format: 'esm',
            sourcemap: true,
            globals: [
               'react',
            ],
         },
      ],
      plugins: [
         typescript({
            module: 'ESNext',
         }),
         commonjs({
            include: './node_modules/**',
         }),
         nodeResolve(),
         replace({
            'process.env.NODE_ENV': JSON.stringify('production')
         }),
      ]
   }
]

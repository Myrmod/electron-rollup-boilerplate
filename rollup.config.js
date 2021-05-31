import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
   // electron
   {
      input: 'src/main.ts',
      output: [
         {
            file: 'build/main.js',
            format: 'esm',
            sourcemap: true,
            inlineDynamicImports: true
         },
      ],
      plugins: [
         nodeResolve({
            modulesOnly: true,
            customResolveOptions: {
               paths: [
                  'src',
               ],
            },
         }),
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
      input: 'src/renderer/index.tsx',
      output: [
         {
            file: 'build/scripts.js',
            format: 'esm',
            sourcemap: true,
            globals: [
               'react',
            ],
            inlineDynamicImports: true
         },
      ],
      plugins: [
         typescript({
            module: 'ESNext',
         }),
         commonjs({
            include: './node_modules/**',
         }),
         nodeResolve({ preferBuiltins: false }),
         replace({
            'process.env.NODE_ENV': JSON.stringify('production')
         }),
      ]
   },
]

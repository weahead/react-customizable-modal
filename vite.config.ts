/// <reference types="vitest" />
/// <reference types="vite/client" />

import fs from 'fs';
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript'

import { peerDependencies } from './package.json'
const input = fs.readdirSync('./examples').map(f => {
  if (fs.lstatSync(`./examples/${f}`).isDirectory()) {
    return `${f}/index.html`
  }
  return f
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'main.ts'),
      formats: ['es', 'cjs', 'umd'],
      fileName: (ext) => `main.${ext}.js`,
      name: 'ReactCustomizableModal'
    },
    rollupOptions: {
      input: input.concat(resolve(__dirname, 'src', 'main.ts')),
      external: [...Object.keys(peerDependencies)],
      output: {
        globals: {
          react: 'React',
          "react-dom": "ReactDOM",
        }
      },
      plugins: [
        typescript({
          'target': 'ES6',
          'rootDir': resolve(__dirname, 'src'),
          'declaration': true,
          'declarationDir': resolve(__dirname, 'dist'),
          exclude: resolve(__dirname, 'node_modules/**'),
          allowSyntheticDefaultImports: true
        })
      ]
    },
    target: 'ES6',
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  }
})

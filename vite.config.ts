import Markdown from 'vite-plugin-vue-markdown'
import { VitePluginVueDemo } from './plugins/demo'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    VitePluginVueDemo(),
    Markdown(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.vue'],
      exclude: ['**/node_modules/**', 'src/markdown/**', 'src/assets/**'],
    }),
  ],
})

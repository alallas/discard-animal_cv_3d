import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import gltf from "vite-plugin-gltf";
import { draco } from "@gltf-transform/functions";


// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "./docs",
    rollupOptions: {
      output: {
        // 在这里修改静态资源路径
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  plugins: [
    react(),
    json(),
    url(),
    image(),
    gltf({
      transforms: [draco()],
    }),
  ],
  minify: true, // 是否压缩代码
  sourceMap: true, // 是否生成sourceMap
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src',
        import.meta.url))
    }
  },
})

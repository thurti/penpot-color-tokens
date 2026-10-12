import { defineConfig, type ConfigEnv, type LibraryFormats } from 'vite'
import { fileURLToPath } from 'url'
import preact from '@preact/preset-vite'
import livePreview from 'vite-live-preview'
import { resolve } from 'path'

const pathResolver = (path: string) => (
  fileURLToPath(new URL(`./src/${path}`, import.meta.url))
)

const baseConfig = {
  plugins: [
    preact(),
    livePreview({ reload: true }),
  ],
  resolve: {
    alias: [
      { find: '@assets', replacement: pathResolver('assets') },
      { find: '@consts', replacement: pathResolver('consts') },
      { find: '@components', replacement: pathResolver('components') },
      { find: '@hooks', replacement: pathResolver('hooks') },
      { find: '@plugin', replacement: pathResolver('plugin') },
      { find: '@utils', replacement: pathResolver('utils') },
    ],
  },
  preview: {
    port: 4400,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  server: {
    port: 4400,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
}

const pluginConfig = {
  define: {
    // Absolute public URL of the deployed plugin incl. trailing slash; empty = relative
    __PLUGIN_BASE_URL__: JSON.stringify(process.env.PLUGIN_BASE_URL ?? ''),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugin.ts'),
      formats: ['iife' as LibraryFormats],
      name: 'PenpotColorTokens',
      fileName: () => 'plugin.js',
    },
    outDir: 'dist',
    emptyOutDir: false,
  }
}

const uiConfig = {
  // Relative asset URLs so the build also works under a sub-path (GitHub Pages project site)
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
      },
    },
    outDir: 'dist',
  }
}

export default defineConfig(({ mode }: ConfigEnv) => {
  if (mode === 'plugin') {
    console.log('Building plugin with IIFE format...')
    return { ...baseConfig, ...pluginConfig }
  }
  else {
    console.log('Building UI with ES modules...')
    return { ...baseConfig, ...uiConfig }
  }
})

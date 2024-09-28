import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        dimensions: false,
        // 將 fill="#000" 替換為 fill="currentColor"，從而支援單色icon通過 CSS 替換顏色
        replaceAttrValues: { '#000': 'currentColor' },
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
        },
      },
    }),
  ],
  ssr: {
    noExternal: ['react-use'],
  },
  optimizeDeps: {
    include: ['react-use'],
  },
})

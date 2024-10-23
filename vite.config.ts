import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import fs from 'fs'
import path from 'path'

/**
 * 更新 tonconnect-manifest.json 文件中的 url 和 iconUrl
 * @param domain - 替换的域名
 * @param manifestFilePath - tonconnect-manifest.json 文件的路径
 */
function updateTonConnectManifest(domain: string, manifestFilePath: string) {
  try {
    // 读取并解析 tonconnect-manifest.json
    const manifest = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'))

    // 更新 url 和 iconUrl
    manifest.url = domain
    manifest.iconUrl = `${domain}/logo.png`

    // 将更新后的内容写回文件
    fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2))
    console.log(`TonConnect manifest updated with domain: ${domain}`)
  } catch (error) {
    console.error(`Failed to update TonConnect manifest: ${error}`)
  }
}

/**
 * 自定义 Vite 插件，确保在构建结束时更新 manifest
 */
function generateTonConnectManifestPlugin(): PluginOption {
  return {
    name: 'update-tonconnect-manifest',
    apply: 'build', // 仅在构建过程中应用
    enforce: 'pre', // 在其他插件之后执行
    config() {
      const domain = process.env.VITE_APP_DOMAIN || ''
      const manifestPath = path.resolve(__dirname, 'public/tonconnect-manifest.json')
      updateTonConnectManifest(domain, manifestPath)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      generateTonConnectManifestPlugin(),
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
      nodePolyfills({ include: ['buffer'] }),
    ],
    ssr: {
      noExternal: ['react-use'],
    },
    optimizeDeps: {
      include: ['react-use'],
    },
    server: {
      proxy: {
        '^/ajax/.*': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  }
})

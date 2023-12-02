// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import viteImagemin from 'vite-plugin-imagemin';

import vitePrerender, { PuppeteerRenderer as Renderer } from 'vite-plugin-prerender';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
  
 
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@400;700', // 僅加載所需的 400 和 700 字體權重
        }],
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'], // 自動導入 Vue 和 Vue-router 相關函數
      dts: 'src/auto-imports.d.ts', // 生成 .d.ts 檔案
    }),
    Components({
      resolvers: [VuetifyResolver()],
      dts: 'src/components.d.ts', // 生成 .d.ts 檔案
    }),
    viteImagemin({
      // 配置壓縮選項
      optipng: {
        optimizationLevel: 7,
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      },
    }),
    
    VitePWA({
      // PWA 插件配置
      registerType: 'autoUpdate',
      manifest: {
        // 您的應用資訊
        name: '啟英高中缺曠工具',
        short_name: 'CyvsTool',
        description: '啟英高中缺曠工具',
        theme_color: '#ffffff',
        display: "fullscreen",
      },
    }),
    vitePrerender({
      // 只預渲染首頁路由
      routes: ['/'],
      // 指定靜態文件目錄
      staticDir: path.join(__dirname, 'dist'),
      // 是否壓縮 HTML 文件
      minify: true,
      // 遇到網絡請求失敗或404錯誤時的回退 HTML 文件
      fallback: 'index.html',
      // 配置 Puppeteer Renderer
      renderer: new Renderer({
        headless: true, // 是否顯示瀏覽器窗口，設為 false 可用於調試
      }),
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    minify: "terser",
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true,
        },
    }

},
})

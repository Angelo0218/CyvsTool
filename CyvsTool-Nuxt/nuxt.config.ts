import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import VuetifyPlugin from "vite-plugin-vuetify";
import PurgeCSS from "vite-plugin-purgecss";

export default defineNuxtConfig({
  app: {
    head: {
      title: "啟英高中-缺曠工具",
      htmlAttrs: {
        lang: "zh-Hant",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "啟英高中缺曠工具：由啟英高中學生開發的非官方工具，專為學生設計，用以便捷地查詢個人的本學期各科目的缺曠課狀況。",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          property: "og:title",
          content: "啟英高中缺曠查詢工具",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://cyvstool.ajlo.org",
        },
        {
          property: "og:image",
          content: "/web.png",
        },
        {
          property: "og:image:alt",
          content: "啟英高中缺曠查詢工具",
        },
        {
          property: "og:image:type",
          content: "image/png",
        },
        {
          property: "og:description",
          content:
            "啟英高中缺曠查詢工具：由啟英高中學生開發的非官方工具，專為學生設計，用以便捷地查詢個人的本學期各科目的缺曠課狀況。",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "57x57",
          href: "/apple-icon-57x57.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "60x60",
          href: "/apple-icon-60x60.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/apple-icon-72x72.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/apple-icon-76x76.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "114x114",
          href: "/apple-icon-114x114.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/apple-icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "144x144",
          href: "/apple-icon-144x144.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/apple-icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-icon-180x180.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-icon-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
      ],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxtjs/robots",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  pwa: {
    manifest: {
      name: "啟英高中缺曠工具",
      short_name: "啟英工具",
      description: "啟英高中缺曠工具：由啟英高中學生開發的非官方工具，專為學生設計，用以便捷地查詢個人的本學期各科目的缺曠課狀況。",
      lang: "zh-Hant",
      useWebmanifestExtension: true,
      background_color: "#FFFFFF",
      theme_color: "#4A90E2",
      display: "standalone",
      scope: "/",
      start_url: "/",
      prefer_related_applications: false,
      icons: [
        {
          src: "/android-icon-36x36.png",
          sizes: "36x36",
          type: "image/png",
        },
        {
          src: "/android-icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/android-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/android-icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/android-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/apple-icon-57x57.png",
          sizes: "57x57",
          type: "image/png",
        },
        {
          src: "/apple-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          src: "/apple-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/apple-icon-76x76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          src: "/apple-icon-114x114.png",
          sizes: "114x114",
          type: "image/png",
        },
        {
          src: "/apple-icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          src: "/apple-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/apple-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "/apple-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "/ms-icon-70x70.png",
          sizes: "70x70",
          type: "image/png",
        },
        {
          src: "/ms-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/ms-icon-150x150.png",
          sizes: "150x150",
          type: "image/png",
        },
        {
          src: "/ms-icon-310x310.png",
          sizes: "310x310",
          type: "image/png",
        },
        {
          src: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          src: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/apple-icon.png",
          sizes: "180x180",
          type: "image/png",
        }
      ],
      
      shortcuts: [
        {
          name: "查詢缺曠",
          short_name: "查詢",
          description: "快速查詢缺曠記錄",
          url: "/",
          icons: [{ src: "/android-icon-192x192.png", sizes: "192x192" }],
        },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: "https://cyvstool.ajlo.org/.*",
          handler: "NetworkFirst",
          method: "GET",
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
        },
      ],
    },
  },
  
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [
      VuetifyPlugin({
        autoImport: true,
      }),
      PurgeCSS({
        // PurgeCSS 的配置選項
        content: [
          `components/**/*.{vue,js,ts}`,
          `layouts/**/*.vue`,
          `pages/**/*.vue`,
          `plugins/**/*.{js,ts}`,
          `nuxt.config.{js,ts}`,
        ],
        safelist: ["some-safe-class"], // 如果有需要保留的 CSS 類，加入到這裡
      }),
    ],
  },
  robots: {
    UserAgent: "*",
    Allow: "/",
  },
});

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
  srcDir: "client/",
  // server: {
  //   host: '0' // default: localhost
  // },

  app: {
    head: {
      title: "SQUALES",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Nuxt 3 Awesome Starter",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  build: {
    extends(config: any, ctx: any, { isDev, isClient, loaders: { vue } }) {
      if (ctx.isDev) {
        config.devtool = ctx.isclient ? "source-map" : "inline-source-map";
      }
      if (isClient) {
        vue.transformAssetUrls.img = ["data-src", "src"];
        vue.transformAssetUrls.source = ["data-srcset", "srcset"];
        vue.transformAssetUrls.LazyImage = ["src"];
      }
    },
  },
  pageTransition: { "page-fade": true },

  // css: ["~/assets/scss/index.scss", "~/assets/css/tailwind.css"],
  css: [
    '@/assets/css/tailwind.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@vueuse/nuxt',
  ],

  //
  // components: {
  //   dirs: ["@/components"],
  //   global: true,
  // },
  //
  //
  plugin: [
    "~/plugins/api",
    // "~/plugins/lazy-loading",
    // "~/plugins/persistedstate",
    // "~/plugins/services",
    // "@/plugins/flowbite.client.ts",
  ],
  //
  //
  // buildModules: [
  //   "@vueuse/core/nuxt",
  //   "@nuxtclub/feathericons",
  //   ["@pinia/nuxt", { disableVuex: false }],
  // ],


  devServerHandlers: [],

  // experimental features
  experimental: {
    reactivityTransform: true,
  },

  publicRuntimeConfig: {
    apiURL: process.env.API_URL || "http://localhost",
  },
});

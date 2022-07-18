import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  srcDir: "client/",
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

  css: ["~/assets/scss/index.scss", "~/assets/css/tailwind.css"],

  components: {
    dirs: ["@/components"],
    global: true,
  },

  modules: ["@nuxtjs/tailwindcss"],

  plugin: [
    "~/plugins/api",
    "~/plugins/lazy-loading",
    "~/plugins/persistedstate",
    "~/plugins/services",
  ],

  buildModules: [
    "@vueuse/core/nuxt",
    "@nuxtclub/feathericons",
    ["@pinia/nuxt", { disableVuex: false }],
  ],
  devServerHandlers: [],

  publicRuntimeConfig: {
    apiURL: process.env.API_URL || "http://localhost:80/",
  },
});

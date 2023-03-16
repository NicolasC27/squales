import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({

    build: {
        extends(config: any, ctx: any, { isDev, isClient, loaders: { vue } })
        {
            if (ctx.isDev) {
                config.devtool = ctx.isclient ? 'source-map' : 'inline-source-map'
            }
            if (isClient)
            {
                vue.transformAssetUrls.img = ['data-src', 'src']
                vue.transformAssetUrls.source = ['data-srcset', 'srcset']
                vue.transformAssetUrls.LazyImage = ["src"]; 
            }
        },

    },
    components: {
        dirs: ['~/components'],
        global: true,
    },
    css: [
        "@/assets/css/font.css"
    ],
 
    buildModules: [
        '@vueuse/core/nuxt',
        'nuxt-windicss'
    ],
    publicRuntimeConfig: {
        apiURL: process.env.API_URL || 'http://localhost:80',
    },
})

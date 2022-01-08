const dotenv = require('dotenv')

import axios from 'axios'

import { 
  logAllowed,
  configApp
} from './utils/utilsConfig'

// loads .env file(s)
dotenv.config()
// dotenv.config({ path: 'production.env' })

const RUN_MODE = process.env.NUXT_ENV_RUN_MODE || process.env.NUXT_ENV_RUN_MODE_OVERIDE

const config = new configApp(RUN_MODE, process.env)
console.log('>>> nuxt.config.js (start) / config : ', config)


export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: config.appTitle,
    htmlAttrs: {
      lang: config.defaultLocale,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: config.port, // 4000
    host: config.host // XXX.XX.XX.XX
  },

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    MODE_APP: config.mode,
    LOG: logAllowed.includes(config.mode),
    CONFIG_APP: config,
  },

    /*
   ** Routes and middlewares to load before loading routes
   */
   router: {
    prefetchLinks: false,
    middleware: [
      'getConfig',
      'buildNavbar',
      'buildFooter',
      'buildRoutes',
      'getRouteConfig'
    ]
  },

  /*
  ** i18n
  ** cf : https://phrase.com/blog/posts/nuxt-js-tutorial-i18n/
  ** cf : 
  */
  i18n: {
    defaultLocale: config.defaultLocale || defaultLoc, // 'fr',
    locales: config.localesBuild,
    vueI18n: {
      fallbackLocale: config.defaultLocale || defaultLoc // 'fr',
    },
    lazy: true,
    langDir: 'locales/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'bulma',
    '@/assets/custom-styles.scss',
    // '~/assets/custom-styles.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/globalComponents',
    { src: '~/plugins/axios', mode: 'client' },
    { src: '~/plugins/showdown.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    ['nuxt-i18n', {
      strategy: 'no_prefix',
      defaultLocale: 'en'
    }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}

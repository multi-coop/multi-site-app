const showdownHighlight = require("showdown-highlight")

export const state = () => ({

  // GLOABAL APP ENV
  appVersion: process.env.CONFIG_APP.appVersion,
  appTitle: process.env.CONFIG_APP.appTitle,
  appThemes: process.env.CONFIG_APP.vuetifyThemes,
  appRunMode: process.env.MODE_APP,
  log: process.env.LOG,

  // MATOMO ANALYTICS
  isMatomoSet: false,
  isMatomo: false,
  matomoServer: undefined,
  matomoSiteId: undefined,
  matomoTrackOutlinks: false,

  // LOCALES FOR i18n
  locale: undefined,
  locales: undefined,
  localeFallback: undefined,
  localesDict: {
    fr: 'Français',
    en: 'English',
    es: 'Español'
  },

  // CONFIG
  configFile: undefined,

  gitInfos: undefined,

  config: undefined,

  navbar: undefined,
  footer: undefined,
  routes: undefined,

  // NAV
  currentRoute: undefined,
  crumbsPath: [],

  // FILTERS
  filters: {}
})

export const getters = {
  getShowdownOptions: (state) => {
    return {
      flavor: state.config.data.app_md_flavor || 'original',
      options: {
        emojis: state.config.data.app_md_emojis || true,
        tables: true,
        // tasklist: true,
        // openLinksInNewWindow: true
      },
      extensions: [
        showdownHighlight({ pre: true })
      ]
    }
  },
  getCurrentRouteConfig: (state) => (currentPath) => {
    return state.routes.data.routes.find( route => route.url === currentPath)
  },
  getGitRawRoot: (state) => {
    const root = state.gitInfos &&  state.gitInfos.gitRawRoot
    return root
  },
  getGitPublicRoot: (state) => {
    const root = state.gitInfos &&  state.gitInfos.gitPublicRoot
    return root
  }
}

export const mutations = {
  setConfig (state, { space, obj }) {
    state[space] = obj
  },
  setMatomo (state, matomoConfig) {
    // console.log('\n-S- setMatomo > matomoConfig : ', matomoConfig)
    const hasMatomoConfig = !!matomoConfig
    // console.log('-S- setMatomo > hasMatomoConfig : ', hasMatomoConfig)
    const isMatomoActivated = hasMatomoConfig && matomoConfig.matomo_active
    // console.log('-S- setMatomo > isMatomoActivated : ', isMatomoActivated)

    state.isMatomo = isMatomoActivated
    state.matomoServer = isMatomoActivated && matomoConfig.matomo_server
    state.matomoSiteId = isMatomoActivated && matomoConfig.matomo_site_id
    state.matomoTrackOutlinks = isMatomoActivated && matomoConfig.matomo_track_outlinks

    // console.log('-S- setMatomo > state.matomoServer  : ', state.matomoServer )
    // console.log('-S- setMatomo > state.matomoSiteId  : ', state.matomoSiteId )
    // console.log('-S- setMatomo > state.matomoTrackOutlinks  : ', state.matomoTrackOutlinks )

    state.isMatomoSet = true
  }
}

export const actions = {

  async updateConfig ({commit}, configObject) {
    await commit('setConfig', {space: 'config', obj: configObject})
  },

  updateLocale ({commit}, locale) {
    commit('setConfig', {space: 'locale', obj: locale})
  },
  updateLocaleFallback ({commit}, locale) {
    commit('setConfig', {space: 'localeFallback', obj: locale})
  },
  updateLocales ({commit}, locales) {
    commit('setConfig', {space: 'locales', obj: locales})
  },

  async updateConfigFile ({commit}, configObject) {
    return await commit('setConfig', {space: 'configFile', obj: configObject})
  },
  updateGitInfos ({commit}, gitInfos) {
    commit('setConfig', {space: 'gitInfos', obj: gitInfos})
  },

  async updateNavbar ({commit}, configObject) {
    return await commit('setConfig', {space: 'navbar', obj: configObject})
  },
  async updateRoutes ({commit}, configObject) {
    return await commit('setConfig', {space: 'routes', obj: configObject})
  },
  async updateFooter ({commit}, configObject) {
    return await commit('setConfig', {space: 'footer', obj: configObject})
  },

  async updateCurrentRoute ({commit}, route) {
    return await commit('setConfig', {space: 'currentRoute', obj: route})
  },

  setMatomoConfig ({commit}, matomoConfig) {
    commit('setMatomo', matomoConfig)
  }
}

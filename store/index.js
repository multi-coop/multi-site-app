
export const state = () => ({

  // GLOABAL APP ENV
  appVersion: process.env.CONFIG_APP.appVersion,
  appTitle: process.env.CONFIG_APP.appTitle,
  appThemes: process.env.CONFIG_APP.vuetifyThemes,
  appRunMode: process.env.MODE_APP,
  log: process.env.LOG,

  // LOCALES FOR i18n
  locale: undefined,
  locales: undefined,

  // CONFIG
  contentsRepo: undefined,
  configFile: undefined,

  gitInfos: undefined,

  config: undefined,

  navbar: undefined,
  footer: undefined,
  routes: undefined,

  // NAV
  currentRoute: undefined,
  crumbsPath: []
})

export const getters = {
  getCurrentRouteConfig: (state) => (currentPath) => {
    return state.routes.data.routes.find( route => route.url === currentPath)
  },
  getGitRawRoot: (state) => {
    const root = state.gitInfos &&  state.gitInfos.gitRawRoot
    return root
  }
}

export const mutations = {
  setConfig (state, { space, obj }) {
    state[space] = obj
  },
}

export const actions = {

  updateLocale ({commit}, locale) {
    commit('setConfig', {space: 'locale', obj: locale})
  },
  updateLocales ({commit}, locales) {
    commit('setConfig', {space: 'locales', obj: locales})
  },

  async updateContentsRepo ({commit}, configObject) {
    return await commit('setConfig', {space: 'contentsRepo', obj: configObject})
  },
  async updateConfigFile ({commit}, configObject) {
    return await commit('setConfig', {space: 'configFile', obj: configObject})
  },
  updateGitInfos ({commit}, gitInfos) {
    commit('setConfig', {space: 'gitInfos', obj: gitInfos})
  },
  async updateConfig ({commit}, configObject) {
    await commit('setConfig', {space: 'config', obj: configObject})
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
}
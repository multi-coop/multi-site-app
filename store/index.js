
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
  config: undefined,

  crumbsPath: []
})

export const getters = {
}

export const mutations = {
  setConfig (state, { space, obj }) {
    state[space] = obj
  },
}

export const actions = {
  updateContentsRepo ({commit}, contentsRepo) {
    commit('setConfig', {space: 'contentsRepo', obj: contentsRepo})
  },
  updateConfigFile ({commit}, configFile) {
    commit('setConfig', {space: 'configFile', obj: configFile})
  },
  updateConfig ({commit}, configObject) {
    commit('setConfig', {space: 'config', obj: configObject})
  }
}

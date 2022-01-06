
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
  config: undefined,

  crumbsPath: []
})

export const getters = {
}

export const mutations = {
  setConfig (state, configObject) {
    state.config = configObject
  },
}

export const actions = {
  updateConfig ({commit}, configObject) {
    commit('setConfig', configObject)
  }
}

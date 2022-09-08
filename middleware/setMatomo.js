export default function ({
  store
}) {
  // console.log('\n-MW- setMatomo > ... ')
  
  if (!store.state.isMatomoSet) {
    const matomoConfig = store.state.config.data.matomo
    // console.log('\n-MW- setMatomo > matomoConfig : ', matomoConfig)
    return store.dispatch('setMatomoConfig', matomoConfig)
  }
}

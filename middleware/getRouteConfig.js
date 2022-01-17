export default function ({ 
  store, 
  route, 
  redirect 
}) {

  const path = route.path

  const queryLocale = route.query.locale
  if (queryLocale) {
    // console.log('-MW- getRouteConfig / queryLocale : ', queryLocale)
    store.dispatch('updateLocale', queryLocale)
  }

  // console.log('-MW- getRouteConfig / path : ', path)

  const currentRouteConfig = store.getters.getCurrentRouteConfig(path)
  // console.log('-MW- getRouteConfig / currentRouteConfig : ', currentRouteConfig)
  
  // store.dispatch('data/resetAvailableTags')
  return store.dispatch('updateCurrentRoute', currentRouteConfig)

}

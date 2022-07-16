export default function ({ 
  store,
  route 
}) {

  // console.log('\n-MW- getRouteConfig / route.query : ', route.query)
  const path = route.path
  const currentRouteConfig = store.getters.getCurrentRouteConfig(path)
  // console.log('-MW- getRouteConfig / currentRouteConfig : ', currentRouteConfig)
  
  // store.dispatch('data/resetAvailableTags')
  return store.dispatch('updateCurrentRoute', currentRouteConfig)

}

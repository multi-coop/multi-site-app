export default function ({ 
  store,
  route 
}) {

  // console.log('\n-MW- GetRouteLocale / route : ', route)
  // console.log('-MW- GetRouteLocale / store.state.locale : ', store.state.locale)

  const queryLocale = route.query.locale
  if (queryLocale) {
    // console.log('-MW- GetRouteLocale : ', queryLocale)
    return store.dispatch('updateLocale', queryLocale)
  }
  
  return true
}

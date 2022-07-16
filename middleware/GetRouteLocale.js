export default function ({ 
  store,
  route 
}) {

  // console.log('\n-MW- GetRouteLocale / route.path : ', route.path)

  const queryLocale = route.query.locale
  if (queryLocale) {
    // console.log('-MW- GetRouteLocale : ', queryLocale)
    store.dispatch('updateLocale', queryLocale)
  }
  
  const hash = route.hash
  const queryObj = { ...route.query, locale: store.state.locale }
  // console.log('-MW- GetRouteLocale / queryObj : ', queryObj)
  const queryStr = 
    '?' +
    Object.keys(queryObj)
      .map(key => {
        return `${key}=${encodeURIComponent(queryObj[key])}`
      })
      .join('&')
  // console.log('-MW- GetRouteLocale / queryStr : ', queryStr)
  const routeStr = `${route.path}${hash || ''}${queryStr}`
  // console.log('-MW- GetRouteLocale / routeStr : ', routeStr)
  return window.history.pushState(
    {},
    null,
    routeStr
  )
  // route.replace({query: queryObj})
  // return true
}

import matter from 'gray-matter'

export default async function ({
  store,
  env, 
  $axios,
}) {

  // console.log( '-MW- buildRoutes > ... ' ) 
  // console.log( '-MW- buildRoutes > store.state.config : ', store.state.config ) 

  if (!store.state.routes) {

    const gitInfos = store.state.gitInfos
    const routesFile = store.state.config.data.routes
    const urlRoutesFile = `${gitInfos.gitRawRoot}${routesFile}`
    // console.log( '-MW- buildRoutes > urlRoutesFile : ', urlRoutesFile )

    await $axios.get(urlRoutesFile)
      .then( resp => {
        // convert string to json object
        const routesObject = matter(resp.data)
        // console.log( '-MW- buildRoutes > routesObject : ', routesObject ) 
        
        // save to store
        store.dispatch('updateRoutes', routesObject)
      })

  }

}

import matter from 'gray-matter'

export default async function ({
  store,
  env, 
  $axios,
}) {

  console.log( '-MW- buildNavbar > ... ' ) 
  // console.log( '-MW- buildNavbar > store.state.config : ', store.state.config ) 

  if (!store.state.navbar) {

    store.dispatch('updateLocale', store.state.config.data.app_default_locale)
    store.dispatch('updateLocales', store.state.config.data.app_locales)

    const gitInfos = store.state.gitInfos
    const navbarFile = store.state.config.data.navbar
    const urlNavbarFile = `${gitInfos.gitRawRoot}${navbarFile}`
    console.log( '-MW- buildNavbar > urlNavbarFile : ', urlNavbarFile )

    await $axios.get(urlNavbarFile)
      .then( resp => {
        // convert string to json object
        const navbarObject = matter(resp.data)
        // console.log( '-MW- buildNavbar > navbarObject : ', navbarObject ) 
        
        // save to store
        store.dispatch('updateNavbar', navbarObject)
      })
  
  
  }

}

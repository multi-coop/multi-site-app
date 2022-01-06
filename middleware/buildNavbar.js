import matter from 'gray-matter'

export default async function ({
  store,
  env, 
  $axios,
}) {

  console.log( '-MW- buildNavbar > ... ' ) 
  // console.log( '-MW- buildNavbar > store.state.config : ', store.state.config ) 

  if (!store.state.navbar) {

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

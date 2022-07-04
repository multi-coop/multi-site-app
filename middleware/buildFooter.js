import matter from 'gray-matter'

export default async function ({
  store,
  env, 
  $axios,
}) {

  // console.log( '-MW- buildFooter > ... ' ) 
  // console.log( '-MW- buildFooter > store.state.config : ', store.state.config ) 

  if (!store.state.footer) {

    const gitInfos = store.state.gitInfos
    const footerFile = store.state.config.data.footer
    const urlFooterFile = `${gitInfos.gitRawRoot}${footerFile}`
    // console.log( '-MW- buildFooter > urlFooterFile : ', urlFooterFile )

    await $axios.get(urlFooterFile)
      .then( resp => {
        // convert string to json object
        const footerObject = matter(resp.data)
        // console.log( '-MW- buildFooter > footerObject : ', footerObject ) 
        
        // save to store
        store.dispatch('updateFooter', footerObject)
      })
  
  }

}

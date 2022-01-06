import matter from 'gray-matter'

import { extractGitInfos } from '~/utils/utilsGitUrl'

export default async function ({
  store, 
  env, 
  $axios,
}) {

  console.log( '-MW- getConfig > ... ' ) 

  if (!store.state.contentsRepo || !store.state.configFile) {
    store.dispatch('updateContentsRepo', env.CONFIG_APP.contentsRepo)
    store.dispatch('updateConfigFile', env.CONFIG_APP.configFile)
  }

  if (!store.state.config) {
    const urlConfigFile = env.CONFIG_APP.configFile
    
    // extract git infos
    const gitInfos = extractGitInfos(urlConfigFile)
    console.log( '-MW- getConfig > gitInfos : \n', gitInfos ) 
    store.dispatch('updateGitInfos', gitInfos)
    
    await $axios.get(urlConfigFile)
      .then( resp => {

        // convert string to json object
        const configObject = matter(resp.data)
        console.log( '-MW- getConfig > configObject : \n', configObject ) 
        
        // save to store
        return store.dispatch('updateConfig', configObject)
      })
  
  }

}

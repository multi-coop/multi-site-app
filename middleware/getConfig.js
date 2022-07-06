
import matter from 'gray-matter'

import { extractGitInfos } from '~/utils/utilsGitUrl'
// import { GetFileObjectFromURL } from '~/utils/utilsFiles'

export default async function ({
  store, 
  env, 
  $axios,
}) {

  // console.log( '-MW- getConfig > ... ' ) 

  if (!store.state.configFile) {
    store.dispatch('updateConfigFile', env.CONFIG_APP.configFile)
  }

  if (!store.state.config) {
    const urlConfigFile = env.CONFIG_APP.configFile
    
    // extract git infos
    const gitInfos = extractGitInfos(urlConfigFile)
    store.dispatch('updateGitInfos', gitInfos)
    // console.log( '-MW- getConfig > gitInfos : \n', gitInfos ) 

    const urlConfigFileRaw = `${gitInfos.gitRawRoot}${gitInfos.remainingString}`
    // console.log( '-MW- getConfig > urlConfigFileRaw : \n', urlConfigFileRaw ) 

    await $axios.get(urlConfigFileRaw)
      .then( resp => {

        // convert string to json object
        const configObject = matter(resp.data)
        // console.log( '-MW- getConfig > configObject : \n', configObject ) 
        
        // save to store
        return store.dispatch('updateConfig', configObject)
      })

  }

}

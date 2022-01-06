// import parser from 'md-yaml-json'
// import { processFile as parseToJSON } from 'md-yaml-json'

import matter from 'gray-matter'

export default function ({
  store, 
  env, 
  // context, 
  // route,
  // redirect,
  $axios,
  i18n
}) {

  if (!store.config) {
    const urlConfigFile = env.CONFIG_APP.configFile
    return $axios.get(urlConfigFile)
      .then( resp => {
        // convert string to json object
        const configObject = matter(resp.data)
        console.log( '...configFromYaml > configObject : \n', configObject ) 
        
        // save to store
        store.dispatch('updateConfig', configObject)
      })
  
  
  }

}

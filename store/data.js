
export const state = () => ({

  // FILTERS TAGS
  tagsAvailable: [
    {
      key: 'testKey',
      tags: [
        { name: 'test' }
      ]
    }
  ],
  selected: []

})

export const getters = {
  getTagsAvailable: (state) => {
    return state.tagsAvailable
  }
}

export const mutations = {
  setAvailableTagsKeys (state, tagsKeys) {
    console.log('-S-data-M > setAvailableTagsKeys > tagsKeys :', tagsKeys)
    const existingKeys = state.tagsAvailable.map( t => t.key )
    tagsKeys.forEach( tagKey => {
      if ( !existingKeys.includes(tagKey) ) {
        state.tagsAvailable.push( { key: tagKey, tags: [] } )
      }
    })
  },
  setAvailableTags (state, { key, tags }) {
    console.log('-S-data-M > setAvailableTags > key :', key)
    console.log('-S-data-M > setAvailableTags > tags :', tags)
    
    const tagsList = state.tagsAvailable.find( obj => obj.key === key ) 
    console.log('-S-data-M > setAvailableTags > tagsList :', tagsList)
    
    const tagsNames = tagsList.tags.map( t => t.name)
    for ( const tag of tags) {
      if ( !tagsNames.includes(tag.name) ) {
        tagsList.tags.push( tag )
      }
    }

    const updated = [ ...state.tagsAvailable ]
    const idx = updated.findIndex( e => e.key === key )
    updated[idx] = tagsList

    state.tagsAvailable = updated
  },
  resetAvailableTags (state) {
    state.tagsAvailable = {}
  },
}

export const actions = {
  setAvailableTagsKeys ({commit}, tagsKeys) {
    console.log('-S-data-A > setAvailableTagsKeys > tagsKeys :', tagsKeys)
    commit('setAvailableTagsKeys', tagsKeys )
  },
  setAvailableTags ({commit}, tagsObj) {
    console.log('\n-S-data-A > setAvailableTagsKeys > tagsObj :', tagsObj)
    tagsObj.forEach( tagObj => {
      commit('setAvailableTags', tagObj )
    })
  },
  resetAvailableTags ({commit}) {
    commit('resetAvailableTags' )
  },
  
  
}

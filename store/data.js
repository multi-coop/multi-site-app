
export const state = () => ({

  // FILTERS TAGS
  tagsAvailable: [
    // {
    //   key: 'testKey',
    //   tags: [
    //     { name: 'test' }
    //   ],
    // }
  ],
  selectedTags: []
})

export const getters = {
  getTagsAvailable: (state) => {
    return state.tagsAvailable
  },
  getTagsSelected: (state) => {
    return state.selectedTags
  },
  isSelectionActivated: (state) => {
    let selectionArray = 0
    state.selectedTags.forEach( t => {
      if ( t.tags.length ) {
        selectionArray += 1 
      }
    })
    return selectionArray
  },
  getTagsSelectedByKey: (state) => (key) => {
    return state.selectedTags.find( tagsObj => tagsObj.key === key)
  },
  canShowItem: (state, getters) => (tagsKeys, item) => {
    // console.log('\n-S-data-M > canShowItem > tagsKeys :', tagsKeys)
    // console.log('-S-data-M > canShowItem > item :', item)
    const boolArray = []
    tagsKeys.forEach( key => {
      const keySelection = getters.getTagsSelectedByKey(key)
      // console.log('-S-data-M > canShowItem > keySelection :', keySelection)
      if ( !keySelection.tags.length ) {
        boolArray.push(true)
      } else {
        const itemTags = item[key]
        const every = keySelection.tags.every(tag => itemTags.includes(tag.name))
        boolArray.push(every)
      }
    })
    const checker = boolArray.every(Boolean)
    return checker
  }
}

export const mutations = {
  setAvailableTagsKeys (state, { tagsKeys, space }) {
    // console.log('-S-data-M > setAvailableTagsKeys > tagsKeys :', tagsKeys)
    const existingKeys = state[space].map( t => t.key )
    // console.log('-S-data-M > setAvailableTagsKeys > existingKeys :', existingKeys)
    tagsKeys.forEach( tagKey => {
      // console.log('-S-data-M > setAvailableTagsKeys > tagKey :', tagKey)
      if ( !existingKeys.includes(tagKey) ) {
        const tagsObj = { key: tagKey, tags: [] }
        state[space].push( tagsObj )
      }
    })
  },

  setTags (state, { key, tags, space }) {
    // console.log('-S-data-M > setTags > key :', key)
    // console.log('-S-data-M > setTags > tags :', tags)
    // console.log('-S-data-M > setTags > space :', space)
    const toUpdate = [ ...state[space] ]
    // console.log('-S-data-M > setTags > toUpdate :', toUpdate)
    const tagsList = toUpdate.find( obj => obj.key === key ) 
    // console.log('-S-data-M > setTags > tagsList :', tagsList)
    if ( space === 'tagsAvailable' ) {
      const tagsNames = tagsList.tags.map( t => t.name )
      for ( const tag of tags) {
        if ( !tagsNames.includes(tag.name) ) {
          tagsList.tags.push( tag )
        }
      }
    } else {
      tagsList.tags = tags
    }
    const idx = toUpdate.findIndex( e => e.key === key )
    toUpdate[idx] = tagsList
    state[space] = toUpdate
    // console.log('-S-data-M > setTags > state.tagsAvailable :', state.tagsAvailable)
    // console.log('-S-data-M > setTags > state.selectedTags :', state.selectedTags)
  },

  resetAvailableTags (state) {
    state.tagsAvailable = []
    state.tagsSelected = []
  },


}

export const actions = {
  setAvailableTagsKeys ({commit}, tagsKeysObj) {
    // console.log('\n-S-data-A > setAvailableTagsKeys > tagsKeysObj :', tagsKeysObj)
    commit('setAvailableTagsKeys', { tagsKeys: tagsKeysObj, space: 'tagsAvailable' } )
    commit('setAvailableTagsKeys', { tagsKeys: tagsKeysObj, space: 'selectedTags' } )
  },

  setAvailableTags ({commit}, tagsObj) {
    // console.log('\n-S-data-A > setAvailableTags > tagsObj :', tagsObj)
    tagsObj.forEach( tagObj => {
      commit('setTags', { ...tagObj, space: 'tagsAvailable'} )
    })
  },
  resetAvailableTags ({commit}) {
    commit('resetAvailableTags' )
  },
  
  updateSelectedTags({commit}, tagObj) {
    // console.log('\n-S-data-A > updateSelectedTags > tagObj :', tagObj)
    commit('setTags', { ...tagObj, space: 'selectedTags' } )
  }
  
}

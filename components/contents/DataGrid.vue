<template>
  <div class="mt-6">

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="level"
      >
      <div class="columns">
        <div 
          v-if="sectionData"
          class="column" 
          >
          sectionData.data : <br><code>
            <pre>
              {{ sectionData.data }}
            </pre>
          </code>
        </div>
      </div>

      <!-- DEBUG TAGS -->
      <div v-if="tagsAvailable">
        <!-- <p>
          tagsAvailable : <br>
          <code>
            <pre>
              {{ tagsAvailable }}
            </pre>
          </code>
        </p> -->
        <p>
          usableTags : <br>
          <code>
            <pre>
              {{ usableTags }}
            </pre>
          </code>
        </p>
      </div>
      
      <p>
        <b>selectedTags : </b> 
        <code>
          {{ selectedTags }}
        </code>
      </p>

    </div>


    <!-- FILTERS -->
    <div 
      v-if="options.filters"
      class="columns mb-5 is-centered is-multiline"
      >
      <div
        class="column is-one-third"
        v-for="filter in options.filters.items"
        :key="filter.name"
        >
        <DataCardsFilter
          :label="filter.name"
          :itemDict="itemDict"
          :tags="usableTags.find( e => e.key === filter.name)"
          :debug="false"
        />
      </div>
    </div>


    <!-- CARDS -->
    <div
      v-if="sectionData"
      :class="`columns is-multiline is-centered is-variable ${gapSize}`"
      >
      <DataCard
        v-for="(cardFile, idx) in sectionData.data.items"
        :key="`${cardFile.file}-${idx}`"
        :sectionIndex="sectionIndex"
        :file="cardFile.file"
        :options="options"
        :colSize="colSize"
        :itemDict="sectionData.data.dict"
        :index="idx"
        :debug="false"
      />
    </div>

  </div>
</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex' 

export default {
  name: 'DataGrid',
  components: {
    DataCardsFilter: () => import(/* webpackChunkName: "DataCardsFilter" */ '~/components/contents/DataCardsFilter.vue'),
    DataCard: () => import(/* webpackChunkName: "DataCard" */ '~/components/contents/DataCard.vue'),
  },
  props: [
    'sectionIndex',
    'sectionData',
    'debug',
  ],
  // beforeDestroy() {
  //   this.resetAvailableTags()
  // },
  created() {
    this.setAvailableTagsKeys(this.tagsKeys)
  },
  data() {
    return {
      gapDict: {
        'half': 'is-5',
        'one-third': 'is-4'
      }
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      tagsAvailable: (state) => state.data.tagsAvailable,
      selectedTags: (state) => state.data.selectedTags,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
      // tagsAvailable: 'data/getTagsAvailable',
      // selectedTags: 'data/getTagsSelected',
    }),
    options() {
      return this.sectionData.data.options 
    },
    itemDict() {
      return this.sectionData.data.dict 
    },
    colSize() {
      return this.options['columns-size'] || 'one-third'
    },
    gapSize() {
      return this.gapDict[this.colSize] || 'is-4'
    },
    tagsKeys() {
      const tagsKeysObj = this.options['tags-keys'] || []
      const tagsKeys = tagsKeysObj.map( t => t.key ) 
      return tagsKeys
    },
    usableTags() {
      const tags = this.tagsAvailable.filter( obj => this.tagsKeys.includes(obj.key) )
      return tags
    }
  },
  methods: {
    ...mapActions({
      resetAvailableTags: 'data/resetAvailableTags',
      setAvailableTagsKeys: 'data/setAvailableTagsKeys'
    })
  }

}
</script>

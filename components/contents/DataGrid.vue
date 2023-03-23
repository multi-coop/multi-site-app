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
      v-if="options.filters && options.filters.activate"
      class="columns mb-5 is-centered is-multiline"
      >
      <div
        v-for="filter in options.filters.items"
        :key="filter.name"
        class="column is-one-third"
        >
        <DataCardsFilter
          :label="filter.name"
          :item-dict="itemDict"
          :tags="usableTags.find( e => e.key === filter.name)"
          :debug="false"
        />
      </div>
    </div>


    <!-- CARDS -->
    <div
      v-if="sectionData && options.list"
      :class="`columns is-multiline is-centered is-variable ${gapSize}`"
      >
      <ListCard
        v-for="(cardFile, idx) in itemsArray"
        :key="`${cardFile.file}-${idx}`"
        :section-index="sectionIndex"
        :file="cardFile.file"
        :options="options"
        :col-size="colSize"
        :item-dict="sectionData.data.dict"
        :index="idx"
        :pre-open-item="preOpenItem"
        :debug="false"
      />
    </div>
    <div
      v-else
      :class="`columns is-multiline is-centered is-variable ${gapSize}`"
      >
      <DataCard
        v-for="(cardFile, idx) in itemsArray"
        :key="`${cardFile.file}-${idx}`"
        :section-index="sectionIndex"
        :file="cardFile.file"
        :options="options"
        :col-size="colSize"
        :item-dict="sectionData.data.dict"
        :index="idx"
        :pre-open-item="preOpenItem"
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
    ListCard: () => import(/* webpackChunkName: "ListCard" */ '~/components/contents/ListCard.vue'),
  },
  props: {
    sectionIndex: {
      default: null,
      type: Number
    },
    sectionData: {
      default: undefined,
      type: Object
    },
    sectionOptions: {
      default: undefined,
      type: Object
    },
    debug: {
      default: undefined,
      type: Boolean
    }
  },
  // beforeDestroy() {
  //   this.resetAvailableTags()
  // },
  data() {
    return {
      preOpenItem: undefined,
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
    itemsArray() {
      let rawArray = this.sectionData.data.items 
      if (this.options.shuffle) {
        rawArray = rawArray
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }
      return rawArray
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
  beforeMount() {
    const preOpenItem = this.$route.query && this.$route.query.item
    // console.log('-C- DataGrid > beforeMount > preOpenItem :', preOpenItem)
    this.preOpenItem = preOpenItem
  },
  created() {
    this.setAvailableTagsKeys(this.tagsKeys)
  },
  methods: {
    ...mapActions({
      resetAvailableTags: 'data/resetAvailableTags',
      setAvailableTagsKeys: 'data/setAvailableTagsKeys'
    })
  }

}
</script>

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
    </div>



    <!-- FILTERS -->
    <div 
      v-if="options.filters"
      class="columns mb-5"
      >
      <div
        class="column"
        v-for="filter in options.filters.items"
        :key="filter.name"
        >
        <DataCardsFilter
          :label="filter.name"
          :tags="usableTags.find( e => e.key === filter.name)"
          :debug="false"
        />
      </div>
    </div>


    <!-- CARDS -->
    <div
      v-if="sectionData"
      class="columns is-multiline is-tablet is-centered is-8"
      >
      <DataCard
        v-for="(cardFile, idx) in sectionData.data.items"
        :key="`${cardFile.file}-${idx}`"
        :file="cardFile.file"
        :options="options"
        :colSize="colSize"
        :dict="sectionData.data.dict"
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
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      // tagsAvailable: (state) => state.data.tagsAvailable,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
      tagsAvailable: 'data/getTagsAvailable',
    }),
    options() {
      return this.sectionData.data.options 
    },
    colSize() {
      return this.options['columns-size'] || 'one-third'
    },
    tagsKeys() {
      const tagsKeys = this.options['tags-keys'].map( t => t.key )
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

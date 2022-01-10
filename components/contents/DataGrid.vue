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
          :tags="[ {name: 'test'} ]"
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
        :selected="selected"
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

import { mapState, mapGetters } from 'vuex' 

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
  data() {
    return {
      selected: []
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
    options() {
      return this.sectionData.data.options 
    },
    colSize() {
      return this.options['columns-size'] || 'one-third'
    }
  },

}
</script>

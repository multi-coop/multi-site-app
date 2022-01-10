<template>
  <div class="block">

    <b-field 
      :label="`${ $translate('filterBy', dict) } : ${ $translate(label, itemDict) }`"
      >

      <!-- https://buefy.org/documentation/taginput#autocomplete -->
      <b-taginput
        v-model="tagsArray"
        :data="filteredTags"
        autocomplete
        :allow-new="allowNew"
        :open-on-focus="openOnFocus"
        field="name"
        icon="label"
        @typing="getFilteredTags"
      />
        <!-- placeholder="Add a tag" -->
    </b-field>

    <div v-if="debug">
      <p>
        <pre 
          style="max-height: 400px"
          >
          <b>filteredTags:</b>
          {{ filteredTags }}
        </pre>
      </p>
      <p>
        <pre 
          style="max-height: 400px"
          >
          <b>tagsArray:</b>
          {{ tagsArray }}
        </pre>
      </p>
    </div>

  </div>

</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataCardsFilter',
  props: [
    'label',
    'itemDict',
    'tags',
    'debug',
  ],
  mounted () {
    this.filteredTags = this.tags && this.tags.tags || []
  },
  data() {
    return {
      filteredTags: [],
      isSelectOnly: false,
      tagsArray: [],
      allowNew: false,
      openOnFocus: true,
      dict: {
        filterBy: {
          fr: 'Filtrer par',
          en: 'Filter by',
        },
      }
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
  },
  methods: {
    getFilteredTags(text) {
      console.log('-C- DataCardsFilter > getFilteredTags > text :', text)
      this.filteredTags = this.tags.tags.filter((t) => {
        return t.name
          .toString()
          .toLowerCase()
          .includes(text.toLowerCase())
      })
    }
  }
}
</script>

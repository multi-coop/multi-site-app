<template>
  <div class="block">

    <b-field 
      :label="`Filter by ${ label }`"
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

    <pre 
      v-if="debug"
      style="max-height: 400px"
      >
      <b>tagsArray:</b>
      {{ tagsArray }}
    </pre>

  </div>

</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataCardsFilter',
  props: [
    'label',
    'tags',
    'debug',
  ],
  mounted () {
    this.filteredTags = this.tags
  },
  data() {
    return {
      filteredTags: undefined,
      isSelectOnly: false,
      tagsArray: [],
      allowNew: false,
      openOnFocus: true
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
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.tags.filter((t) => {
        return t.name === text
      })
    }
  }
}
</script>

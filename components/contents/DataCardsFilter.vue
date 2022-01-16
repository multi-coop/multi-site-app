<template>
  <div class="block">

    <b-field 
      :label="`${ $translate('filterBy', dict) } : ${ $translate(label, itemDict) }`"
      >

      <!-- https://buefy.org/documentation/taginput#autocomplete -->
      <b-taginput
        v-model="tagsArray"
        :data="orderedFilteredTags"
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
        <b>tags.key:</b> 
        <code>
          {{ tags.key }}
        </code>
      </p>
      <p v-if="false">
        <pre 
          style="max-height: 400px"
          >
          <b>tags:</b>
          {{ tags }}
        </pre>
      </p>
      <p v-if="false">
        <b>filteredTags:</b>
        <pre 
          style="max-height: 400px"
          >
          {{ filteredTags }}
        </pre>
      </p>
      <p>
        <b>orderedFilteredTags:</b>
        <pre 
          style="max-height: 400px"
          >
          {{ orderedFilteredTags }}
        </pre>
      </p>
      <p>
        <b>tagsArray:</b>
        <pre 
          style="max-height: 400px"
          >
          {{ tagsArray }}
        </pre>
      </p>
    </div>

  </div>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex' 

export default {
  name: 'DataCardsFilter',
  props: [
    'label',
    'itemDict',
    'tags',
    'debug',
  ],
  watch: {
    tagsArray(next) {
      const tagsKey = this.tags.key
      // console.log('-C- DataCardsFilter > watch > tagsArray > tagsKey :', tagsKey)
      // console.log('-C- DataCardsFilter > watch > tagsArray > next :', next)
      const tagsObj = { key: tagsKey, tags: next  }
      this.updateSelectedTags( tagsObj )
    },
  },
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
    orderedFilteredTags() {
      const orderedTags = [ ...this.filteredTags ]
        .sort( (a,b) => 
          ( a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0 )
        )
      return orderedTags
    }
  },
  methods: {
    ...mapActions({
      updateSelectedTags: 'data/updateSelectedTags'
    }),
    getFilteredTags(text) {
      // console.log('-C- DataCardsFilter > getFilteredTags > text :', text)
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

<template>
  <div>

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="level"
      >
      <div class="columns">
        <div class="column" v-if="sectionData">
          sectionData: <br><code>
            <pre>
              {{ sectionData.data }}
            </pre>
          </code>
        </div>
      </div>
    </div>

    <VueShowdown
      :markdown="sectionData.content"
      :options="{ emoji: true }"
    />

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataGrid',
  props: [
    'sectionData',
    'debug',
  ],
  data() {
    return {
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

}
</script>

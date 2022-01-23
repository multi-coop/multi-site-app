<template>
  <div>

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
          <p>
            sectionData: <br><code>
              <pre>
                {{ sectionData.data }}
              </pre>
            </code>
          </p>
          <p>
            sectionOptions: <br><code>
              <pre>
                {{ sectionOptions }}
              </pre>
            </code>
          </p>
          <p>
            hasColumnsOptions: 
            <code>{{ hasColumnsOptions }}</code>
          </p>

        </div>
      </div>
    </div>

    <div class="content">

      <!-- render columns with options -->
      <div
        class="columns is-multiline is-centered is-variable is-6"
        >
        <div 
          :class="`column ${columnsSize}`"
          >
          <VueShowdown
            :markdown="sectionData.content"
            :options="{ emoji: true }"
          />
        </div>
      </div>
    </div>

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'LogoAnimated',
  props: [
    'sectionData',
    'sectionOptions',
    'debug'
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
    columnsSize() {
      const colSize = this.sectionOptions['columns-size'] || 'two-thirds'
      return `is-${colSize}`
    }
  },

}
</script>


<template>
  <div>

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="block"
      >

      <div class="columns" v-if="sectionData">
        <div class="column">
          sectionData.data: <br><code>
            <pre>
              {{ sectionData.data }}
            </pre>
          </code>
        </div>
        <div class="column">
          sectionData.content: <br><code>
            <pre>
              {{ sectionData.content }}
            </pre>
          </code>
        </div>
      </div>
    </div>

    <div class="">
      <VueShowdown
        :markdown="sectionData.content"
        :options="{ emoji: true, flavor: 'original' }"
      />
    </div>

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'TextComponent',
  props: [
    'sectionData',
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
  },

}
</script>

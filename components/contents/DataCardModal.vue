<template>

  <div class="card">
    DataCardModal
  </div>

</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataCardModal',
  props: [
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
  }
}
</script>

<template>
  <div>

    <VueShowdown
      :markdown="sectionData.content"
      :options="{ emoji: true }"
    />

  </div>
</template>


<script>

import { mapState } from 'vuex' 

export default {
  name: 'TextComponent',
  props: [
    'sectionData'
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
  },

}
</script>

<template>

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        Credits
      </p>
    </div>
  </footer>

</template>


<script>
import { mapState } from 'vuex' 

export default {
  name: 'CreditsFooter',
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
}
</script>

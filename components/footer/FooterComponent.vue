<template>

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        Footer component
      </p>
    </div>
  </footer>

</template>

<script>
import { mapState } from 'vuex' 

export default {
  name: 'FooterComponent',
  computed: {
    ...mapState({
      log: (state) => state.log,
      footer: (state) => state.footer
    }),
  },
}
</script>

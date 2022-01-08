<template>

  <footer class="footer is-size-7 pt-4 pb-6">
    <div class="columns">

      <div 
        v-for="col in footer.data.columns"
        :key="col.name"
        class="column has-text-centered"
        >
        
        <p class="has-text-weight-semibold mb-3">
          {{ col.label[locale]}}
        </p>

        <!-- <code class="has-text-left">
          <pre>
            {{ col }}
          </pre>
        </code> -->

        <p>
          <ul>
            <li
              v-for="link in col.links"
              :key="link.url"
              >
              <a 
                :href="link.url"
                >
                {{ link.label[locale]}}
              </a>
            </li>
          </ul>
        </p>

      </div>

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
      locale: (state) => state.locale,
      footer: (state) => state.footer
    }),
  },
}
</script>

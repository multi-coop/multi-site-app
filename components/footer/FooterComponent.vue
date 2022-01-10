<template>

  <footer class="footer is-size-7 pt-5 pb-3">
    <div class="columns px-6">

      <div 
        v-for="col in footer.data.columns"
        :key="col.name"
        class="column has-text-centered"
        >
        
        <p class="has-text-weight-semibold mb-3">
          {{ $translate('label', col, locale) }}
        </p>

        <!-- <code class="has-text-left">
          <pre>
            {{ col }}
          </pre>
        </code> -->

        <div
          v-if="col.options && col.options.includes('in-line')"
          >
          <a 
            v-for="link in col.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            class="px-2"
            >
            <b-icon
              v-if="link.icon"
              :icon="link.icon"
            />
          </a>
        </div>
        
        <p v-else>
          <ul>
            <li
              v-for="link in col.links"
              :key="link.url"
              >
              <nuxt-link 
                v-if="link.url.startsWith('/')"
                :to="{ path: link.url }"
                >
                {{ $translate('label', link, locale) }}
              </nuxt-link>
              <a 
                v-else
                :href="link.url"
                target="_blank"
                >
                {{ $translate('label', link, locale) }}
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

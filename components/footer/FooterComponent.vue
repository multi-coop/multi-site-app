<template>

  <footer class="footer is-size-7 pt-5 pb-3">
    <div class="columns px-6">

      <div 
        v-for="col in footer.data.columns"
        :key="col.name"
        class="column has-text-centered"
        >
        
        <p 
          class="has-text-weight-semibold mb-2"
          >
          {{ $translate('label', col) }}
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
            @click="trackEvent(link.url, 'GoToExtPage', 'Footer'); trackLink(link.url)"
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
              class="pb-1 mt-1"
              >
              <nuxt-link 
                v-if="link.url.startsWith('/')"
                :to="{ path: link.url }"
                @click="trackEvent(link.url, 'GoToPage', 'Footer')"
                >
                {{ $translate('label', link) }}
              </nuxt-link>
              <a 
                v-else
                :href="link.url"
                target="_blank"
                @click="trackEvent(link.url, 'GoToExtPage', 'Footer'); trackLink(link.url)"
                >
                {{ $translate('label', link) }}
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

import matomo from '~/mixins/matomo'

export default {
  name: 'FooterComponent',
  mixins: [matomo],
  computed: {
    ...mapState({
      log: (state) => state.log,
      footer: (state) => state.footer
    }),
  },
}
</script>

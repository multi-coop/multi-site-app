<template>

  <footer class="footer is-size-7	py-3">
    <div class="content has-text-centered">
      <p class="has-text-weight-semibold pb-2 mb-0">
        {{ $translate('credits', dict, locale) }}
      </p>
      <p>
        ---
        <a
          target="_blank"
          :href="source"
          >
          {{ $translate('sourceCode', dict, locale) }}
        </a>
        - 
        {{ $translate('projetBy', dict, locale) }} 
        © 
        <a 
          target="_blank"
          :href="multiUrl"
          class="has-text-weight-semibold"
          >
          Multi
        </a>
        - 
        {{ years }} 
        ---
      </p>
    </div>
  </footer>

</template>


<script>
import { mapState } from 'vuex' 

export default {
  name: 'CreditsFooter',
  data() {
    return {
      multiUrl: 'https://multi.coop',
      source: 'https://github.com/co-demos/multi-site-app',
      years: '2021-2022',
      dict: {
        credits: {
          fr: 'Crédits',
          en: 'Credits'
        },
        projetBy: {
          fr: 'Un projet par',
          en: 'a project by',
        },
        sourceCode: {
          fr: 'Code source',
          en: 'Source code'
        }
      }
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale
    }),
  },
}
</script>

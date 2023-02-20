<template>

  <footer
    class="footer is-size-7	py-3 has-background-grey">
    <div class="content has-text-centered">

      <!-- <p class="has-text-weight-semibold pb-2 mb-0 credit-text">
        {{ $translate('credits', dict) }}
      </p> -->

      <p class="credit-text">
        <a
          target="_blank"
          :href="gitInfos.gitRepoUrl"
          class="credit-text"
          @click="trackEvent(gitInfos.gitRepoUrl, 'GoToExtPage', 'Credits'); trackLink(gitInfos.gitRepoUrl)"
          >
          {{ $translate('sourceContents', dict) }}
        </a>
        <br>
        <a
          target="_blank"
          :href="source"
          class="credit-text"
          @click="trackEvent(source, 'GoToExtPage', 'Credits'); trackLink(source)"
          >
          {{ $translate('sourceCode', dict) }}
        </a>
        - 
        {{ $translate('projetBy', dict) }} 
        © 
        <a 
          target="_blank"
          :href="multiUrl"
          class="has-text-weight-semibold credit-text"
          @click="trackEvent(multiUrl, 'GoToExtPage', 'Credits'); trackLink(multiUrl)"
          >
          Multi
        </a>
        - 
        {{ years }}-{{ currentYear }}
      </p>
    </div>
  </footer>

</template>


<script>
import { mapState } from 'vuex' 

import matomo from '~/mixins/matomo'

export default {
  name: 'CreditsFooter',
  mixins: [matomo],
  data() {
    return {
      multiUrl: 'https://multi.coop',
      source: 'https://github.com/multi-coop/multi-site-app',
      years: '2021',
      dict: {
        credits: {
          fr: 'Crédits',
          en: 'Credits'
        },
        codeBy: {
          fr: 'Codé par',
          en: 'Coded by'
        },
        projetBy: {
          fr: 'un projet par',
          en: 'a project by',
        },
        sourceContents: {
          fr: 'Contenus du site',
          en: "Website's contents"
        },
        sourceCode: {
          fr: 'Code source de "multi-site-app"',
          en: '"multi-site-app" source code'
        }
      }
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      gitInfos: (state) => state.gitInfos
    }),
    currentYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style>

.credit-text, a.credit-text {
  color: white !important;
}

</style>

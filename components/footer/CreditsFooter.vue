<template>

  <footer class="footer is-size-7	py-3">
    <div class="content has-text-centered">
      
      <p class="has-text-weight-semibold pb-2 mb-0">
        {{ $translate('credits', dict) }}
      </p>

      <p>
        
        <a
          target="_blank"
          :href="gitInfos.gitRepoUrl"
          >
          {{ $translate('sourceContents', dict) }}
        </a>

        <br> 
        
          <a
          target="_blank"
          :href="source"
          >
          {{ $translate('sourceCode', dict) }}
        </a>
        - 
        {{ $translate('projetBy', dict) }} 
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
      source: 'https://github.com/multi-coop/multi-site-app',
      years: '2021-2022',
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
          fr: 'Un projet par',
          en: 'a project by',
        },
        sourceContents: {
          fr: 'Contenus du site',
          en: "Website's contents"
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
      gitInfos: (state) => state.gitInfos,
    }),
  },
}
</script>

<template>
  <div
    class=""
    >

    <!-- NAVBAR -->
    <!-- <NavbarComponent/> -->
    <NavbarSite/>

    <!-- menu left -->
    <section class="main-content columns">
      <!-- <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <NuxtLink :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside> -->

      <div class="container column is-10">
        <Nuxt />
      </div>

    </section>

    <!-- FOOTERS -->
    <FooterComponent/>
    <CreditsFooter/>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex' 

import matomo from '~/mixins/matomo'

import { createStyleLink } from '~/utils/utilsStyles'
import { setMatomoScript } from '~/utils/utilsMatomo'

export default {
  name: 'DefaultLayout',
  components: {
    // NavbarComponent: () => import(/* webpackChunkName: "NavbarComponent" */ '~/components/navbar/NavbarComponent.vue'),
    NavbarSite: () => import(/* webpackChunkName: "NavbarComponent" */ '~/components/navbar/NavbarSite.vue'),
    FooterComponent: () => import(/* webpackChunkName: "FooterComponent" */ '~/components/footer/FooterComponent.vue'),
    CreditsFooter: () => import(/* webpackChunkName: "CreditsFooter" */ '~/components/footer/CreditsFooter.vue')
  },
  mixins: [matomo],
  computed: {
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      config: (state) => state.config,
      navbar: (state) =>  state.navbar,
      gitInfos: (state) =>  state.gitInfos
    }),
    ...mapGetters({
      rawRoot: 'getGitRawRoot'
    })
  },
  mounted () {
    // console.log('C > DefaultLayout > mounted > this.config : ', this.config)
    if (this.config.data.custom_css && this.config.data.custom_css_files) {
      const cssFiles = this.config.data.custom_css_files
      // console.log('C > DefaultLayout > mounted > cssFiles : ', cssFiles)
      let rawRoot = this.rawRoot
      const isLocalhost = this.gitInfos.gitProvider === 'localhost'
      // console.log('C > DefaultLayout > mounted > this.gitInfos.gitProvider : ', this.gitInfos.gitProvider)
      cssFiles.forEach(url => {
        let linkClean = url
        const isLocalFile = url.startsWith('./')
        if (isLocalhost && isLocalFile) {
          rawRoot = rawRoot.replace('/content', '/statics')
          linkClean = linkClean.replace('./', '')
        }
        // console.log('C > DefaultLayout > mounted > rawRoot : ', rawRoot)
        const srcLink = url && url.startsWith('./') ? `${rawRoot}${linkClean}` : linkClean
        // console.log('C > DefaultLayout > mounted > srcLink : ', srcLink)
        createStyleLink(srcLink)
      })
    }
    if (this.isMatomo) {
      // console.log('\nC > DefaultLayout > mounted > this.matomoServer : ', this.matomoServer)
      // console.log('C > DefaultLayout > mounted > this.matomoSiteId : ', this.matomoSiteId)
      // console.log('C > DefaultLayout > mounted > this.matomoTrackOutlinks : ', this.matomoTrackOutlinks)
      setMatomoScript( this.appTitle, this.matomoServer, this.matomoSiteId, this.matomoTrackOutlinks)
    }
  }
}
</script>

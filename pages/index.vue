<template>

  <section 
    v-if="currentRoute"
    :class="`${isHero ? 'hero is-fullheight' : 'mb-6 mt-3 pt-5'}`"
    >

    <!-- CONTENTS SECTION -->
    <div 
      :class="`${isHero ? 'hero-body is-flex-direction-column is-justify-content-center' : ''}`"
      >

      <div 
        v-for="(section, idx) in currentRoute.sections"
        :key="`${idx}-${section.name}`"
        :class="`mb-2 ${isHero ? '' : 'container'}`"
        >
        <ContentsSkeleton 
          :section="section"
          :section-index="idx"
          :debug="false"
        />
      </div>

    </div>

    <!-- DEBUG -->
    <section 
      v-show="debug"
      class="section"
      >
      <div class="columns is-mobile">

        <card title="config obj" icon="">
          <code>
            <pre>
              {{ config.data }}
            </pre>
          </code>
        </card>

        <card title="config md content" icon="">
          <VueShowdown
            :markdown="config.content"
            :options="{ emoji: true }"
          />
        </card>

        <card title="footer obj" icon="">
          <code>
            <pre>
              {{ footer.data }}
            </pre>
          </code>
        </card>

      </div>
    </section>

    <!-- DEBUG -->
    <section 
      v-show="debug"
      class="section"
      >
      <div class="columns is-desktop">

        <card title="routes obj" icon="">
          <code>
            <pre>
              {{ routes.data }}
            </pre>
          </code>
        </card>

        <card title="navbar obj" icon="">
          <code>
            <pre>
              {{ navbar.data }}
            </pre>
          </code>
        </card>


      </div>
    </section>


  </section>
</template>

<script>

import { mapState, mapGetters } from 'vuex' 

import Card from '~/components/Card'
import ContentsSkeleton from '~/components/contents/ContentsSkeleton'

export default {
  name: 'IndexPage',
  components: {
    Card,
    ContentsSkeleton,
    // ContentsSkeleton: () => import(/* webpackChunkName: "ContentsSkeleton" */ '~/components/contents/ContentsSkeleton.vue'),
  },
  data () {
    return {
      debug: false,
    }
  },
  head () { 
    return {
      title: this.config.data.app_name,
      lang: this.locale,
      link: [
        { hid: 'icon', rel: 'icon', href: this.iconUrl, type: 'image/x-icon', },
      ],
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      config: (state) =>  state.config,
      navbar: (state) =>  state.navbar,
      routes: (state) =>  state.routes,
      footer: (state) =>  state.footer,
      locale: (state) => state.locale,
      currentRoute: (state) =>  state.currentRoute,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
    iconUrl() {
      // console.log('-C- IndexPage > iconUrl > this.config.data :', this.config.data)
      const faviconUrl = `${this.rawRoot}${this.config.data.app_icon}`
      // console.log('-C- IndexPage > iconUrl > faviconUrl :', faviconUrl)
      return  faviconUrl || '/favicon_multi.io'
    },
    isHero() {
      return this.currentRoute.options && this.currentRoute.options.hero
    }

  }


}
</script>

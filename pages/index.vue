<template>

  <div 
    v-if="currentRoute"
    :class="`${isHero ? 'hero is-fullheight' : ''}`"
    >

    <!-- <pre><code>{{ currentRoute.options }}</code></pre> -->

    <!-- CONTENTS SECTION -->
    <div 
      v-if="currentRoute.options && currentRoute.options.summary"
      class="content-container">
      <div class="floating-menu">
        <b-menu>
          <b-menu-list label="menu">
            <b-menu-item
              v-for="(section, idx) in currentRoute.sections"
              :key="`sidebar-${idx}-${section.name}`"
              :class="`pb-0 ${section.options.depth ? 'ml-2' : ''}`"
              @click="scrollTo(`#${currentRoute.name}-${idx}-${section.name}`)">
              <template #label>
                <span
                  :class="`is-size-7 ${section.options.depth ? '' : 'has-text-weight-bold'}`">
                  {{ getSectionName(section) }}
                </span>
              </template>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>

      <div class="content-component">
        <div
          v-for="(section, idx) in currentRoute.sections"
          :id="`${currentRoute.name}-${idx}-${section.name}`"
          :key="`${idx}-${section.name}`"
          class="">
          <ContentsSkeleton
            :section="section"
            :section-index="idx"
            :debug="false"
          />
        </div>
      </div>
    </div>

    <div
      v-else 
      :class="`content-container ${isHero ? 'hero-body is-flex-direction-column is-justify-content-center' : ''}`"
      >
      <div :class="`mb-2 ${isHero ? '' : 'container'}`">
        <ContentsSkeleton 
          v-for="(section, idx) in currentRoute.sections"
          :key="`${idx}-${section.name}`"
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


  </div>
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
      sidebarOpen: true,
      debug: false
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
      const faviconUrl = `${this.rawRoot}${this.config.data.app_favicon}`
      // console.log('-C- IndexPage > iconUrl > faviconUrl :', faviconUrl)
      return  faviconUrl || '/favicon_multi.io'
    },
    isHero() {
      return this.currentRoute.options && this.currentRoute.options.hero
    }
  },
  methods: {
    getSectionName(section) {
      const sectionName = (section.options.name && section.options.name[this.locale]) || section.name
      return sectionName
    },
    scrollTo(anchorId) {
      // console.log('\n-C- IndexPage > scrollTo > anchorId :', anchorId)
      const element = document.querySelector(anchorId)
      // console.log('-C- IndexPage > scrollTo > element :', element)
      const topPosition = element.offsetTop - 45
      // console.log('-C- IndexPage > scrollTo > topPosition :', topPosition)
      window.scrollTo({top: topPosition, behavior: 'smooth'})
    }
  }

}
</script>

<style scoped>

.content-container {
  padding-top: 1em;
  padding-bottom: 1em;
}

@media screen and (min-width: 0px) and (max-width: 860px) {
  .floating-menu {
    display: none;
  }
  .content-component {
    margin-left: 50px;
    margin-right: 50px;
  }
}
@media screen and (min-width: 861px) {
  .floating-menu {
    position: fixed;
    width: 220px;
    top: 100px;
    left: 50px;
    z-index: 3;
  }
  .content-component {
    margin-left: 220px;
    /* margin-right: 50px; */
  }
}

</style>

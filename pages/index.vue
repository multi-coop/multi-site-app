<template>

  <div 
    v-if="currentRoute"
    :class="`multi-site-app ${isHero ? 'hero is-fullheight' : ''}`"
    >

    <!-- <pre><code>{{ currentRoute.options }}</code></pre> -->

    <!-- CONTENTS SECTION -->
    <div 
      v-if="currentRoute.options && currentRoute.options.summary"
      class="content-container">
      <div class="floating-menu">
        <b-menu>
          <b-menu-list
            :label="getSectionName(currentRoute, true) || `menu`">
            <b-menu-item
              v-for="(section, idx) in currentRoute.sections"
              v-show="!section.options['not-in-menu']"
              :key="`sidebar-${idx}-${section.name}`"
              :class="`floating-menu-item pb-0 ${section.options.depth ? 'ml-2' : ''}`"
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
          :class="``">
          <ContentsSkeleton
            :section="section"
            :section-index="idx"
            :contrib="routeHasContrib || sectionHasContrib(section)"
            :debug="false"
          />
        </div>
      </div>
    </div>

    <div
      v-else 
      :class="`content-container ${isHero ? 'hero-body is-flex-direction-column is-justify-content-center' : ''}`">
      <div
        :class="`mb-2 ${isHero ? '' : 'container'}`">
        <ContentsSkeleton 
          v-for="(section, idx) in currentRoute.sections"
          :key="`${idx}-${section.name}`"
          :section="section"
          :section-index="idx"
          :contrib="routeHasContrib || sectionHasContrib(section)"
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

    <!-- CUSTOMM CSS STYLING FROM CONFIG -->
    <div
      class="content-container">
      <!-- <pre><code>{{ config.data }}</code></pre>
      <br>{{ configPrimaryColor }} -->
      <style
        v-if="configColors && configPrimaryColor">
        a:not(.navbar-link, .navbar-item, .credit-text), .navbar-link:hover, .navbar-item:hover, a.navbar-item.is-active {
          color: {{ configPrimaryColor }} !important;
        }
        a:not(.navbar-link, .navbar-item, .button) {
          text-decoration: underline;
        }
        .floating-menu-item > a, nav.tabs  > ul > li > a {
          text-decoration: none !important;
        }
        .button.is-primary, .tag.is-primary {
          background-color: {{ configPrimaryColor }} !important;
          color: {{ getContrastYIQ(configPrimaryColor) }} !important;
        }
        .menu-list a.is-active {
          background-color: {{ configPrimaryColor }} !important;
          color: {{ getContrastYIQ(configPrimaryColor) }} !important;
        }
      </style>
    </div>

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
    iconUrl () {
      // console.log('-C- IndexPage > iconUrl > this.config.data :', this.config.data)
      const faviconUrl = `${this.rawRoot}${this.config.data.app_favicon}`
      // console.log('-C- IndexPage > iconUrl > faviconUrl :', faviconUrl)
      return  faviconUrl || '/favicon_multi.io'
    },
    isHero () {
      return this.currentRoute.options && this.currentRoute.options.hero
    },
    routeHasContrib () {
      return this.currentRoute.options && this.currentRoute.options.contrib
    },
    configColors () {
      // return this.config.data && this.config.data.colors
      return this.config.data && this.config.data.custom_colors && this.config.data.colors
    },
    configPrimaryColor () {
      return (this.configColors && this.configColors.primary) || '#7957d5' 
    },
    // menuSections () {
    //   return this.currentRoute.sections.filter(section => !(section.options && section.options['not-in-menu']) )
    // }
  },
  methods: {
    getSectionName (section, isRoute = false) {
      let sectionName = (section.options.name && section.options.name[this.locale])
      sectionName = isRoute ? sectionName : sectionName || section.name
      return sectionName
    },
    sectionHasContrib (section) {
      return section.options && section.options.contrib
    },
    scrollTo (anchorId) {
      // console.log('\n-C- IndexPage > scrollTo > anchorId :', anchorId)
      const element = document.querySelector(anchorId)
      // console.log('-C- IndexPage > scrollTo > element :', element)
      const topPosition = element.offsetTop - 45
      // console.log('-C- IndexPage > scrollTo > topPosition :', topPosition)
      window.scrollTo({top: topPosition, behavior: 'smooth'})
    },
    getContrastYIQ (hexcolor) {
      hexcolor = hexcolor.replace('#', '')
      const r = parseInt(hexcolor.substr(0, 2), 16)
      const g = parseInt(hexcolor.substr(2, 2), 16)
      const b = parseInt(hexcolor.substr(4, 2), 16)
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return (yiq >= 128) ? 'black' : 'white'
    }
  }

}
</script>

<style scoped>

.content-container {
  padding-top: 5em;
  padding-bottom: 5em;
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
    padding: 1em 1em 4em 1em;
    background-color: white;
    width: 260px;
    top: 52px;
    left: 0px;
    z-index: 3;
    overflow: auto;
    /* max-height: 80%; */
    /* Firefox */
    max-height: -moz-calc(100% - 52px);
    /* WebKit */
    max-height: -webkit-calc(100% - 52px);
    /* Opera */
    max-height: -o-calc(100% - 52px);
    /* Standard */
    max-height: calc(100% - 52px);
  }
  .content-component {
    margin-left: 200px;
    /* margin-right: 50px; */
  }
}

</style>

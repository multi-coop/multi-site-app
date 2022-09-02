<template>

  <div 
    v-if="currentRoute"
    :class="`multi-site-app ${isHero ? 'hero is-fullheight' : ''}`"
    >

    <!-- <pre><code>{{ currentRoute.options }}</code></pre> -->

    <!-- CONTENT SECTION -->
    <!-- CONTENT SUMMARY - FLOATING -->
    <div 
      v-if="currentRoute.options && currentRoute.options.summary"
      class="content-container">
      <div class="floating-menu">
        <b-menu>
          <b-menu-list
            :label="getSectionName(currentRoute) || `menu`">
            <!-- DEBUGGING -->
            <!-- <p>
              scrollPosition: <code>{{ scrollPosition }} px</code><br>
              scrollPosAndMargin: <code>{{ scrollPosAndMargin }} px</code><br>
            </p> -->

            <b-menu-item
              v-for="(section, idx) in currentRoute.sections"
              v-show="!section.options['not-in-menu']"
              :key="`section-${idx + 1}-${section.name}`"
              :active="isSectionActive(`#section-${idx + 1}-${section.name}`)"
              :class="`floating-menu-item pb-0 ${section.options.depth ? 'ml-2' : ''}`"
              @click="scrollTo(`#section-${idx + 1}-${section.name}`); trackEvent(section.name, 'ScrollTo', 'Content')">
              <template #label>
                <span
                  :class="`is-size-7 ${section.options.depth ? '' : 'has-text-weight-bold'}`">
                  {{ getSectionName(section) }}
                  <!-- DEBUGGING -->
                  <!-- <p>
                    isSectionActive : <code>{{ isSectionActive(`#section-${idx + 1}-${section.name}`) }}</code></br>
                    <pre><code>{{ getElementBoundingBox(`#section-${idx + 1}-${section.name}`) }}</code></pre>
                  </p> -->
                </span>
              </template>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>

      <!-- CONTENT SECTION -->
      <div class="content-component">
        <div
          v-for="(section, idx) in currentRoute.sections"
          :id="`section-${idx + 1}-${section.name}`"
          :key="`section-${idx + 1}-${section.name}`"
          :class="``">

          <ContentsSkeleton
            :section="section"
            :section-index="idx"
            :contrib="routeHasContrib || sectionHasContrib(section)"
            :debug="false"
          />

          <!-- DEBUGGING -->
          <!-- <p>
            <code>{{ `#${idx}-${section.name}` }}</code><br>
            <pre><code>{{ getElementBoundingBox(`#${idx}-${section.name}`) }}</code></pre>
          </p> -->
        </div>
      </div>
    </div>

    <!-- CONTENT SECTION (NO SUMMARY) -->
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
        a:not(.navbar-link, .navbar-item, .button, .navbar-mobile-item) {
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

import matomo from '~/mixins/matomo'

import Card from '~/components/Card'
import ContentsSkeleton from '~/components/contents/ContentsSkeleton'

export default {
  name: 'IndexPage',
  components: {
    Card,
    ContentsSkeleton,
    // ContentsSkeleton: () => import(/* webpackChunkName: "ContentsSkeleton" */ '~/components/contents/ContentsSkeleton.vue'),
  },
  mixins: [matomo],
  data () {
    return {
      sidebarOpen: true,
      debug: false,
      activeSection: undefined,
      isAutoScrolling: false,
      scrollPositionY: 0,
      scrollMarginTop: 46,
      interMarginY: 11
    }
  },
  head () { 
    return {
      title: `${this.config.data.app_name}${this.currentRoute.name ? ' - ' + this.getSectionName(this.currentRoute) : ''}`,
      lang: this.locale,
      link: [
        { hid: 'icon', rel: 'icon', href: this.iconUrl, type: 'image/x-icon', },
      ]
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
    scrollPosAndMargin () {
      return this.scrollMarginTop + this.scrollPositionY
    }
  },
  watch: {
    locale () {
      const hash = this.$route.hash
      // console.log('\n-C- IndexPage > watch > locale > hash :', hash)
      this.updateUrl(hash, false, true)
    },
    currentRoute (next) {
      this.trackEvent(next.url, 'ChangePage', 'Site')
    }
  },
  mounted () {
    // console.log('\n-C- IndexPage > mounted > ... ')
    window.addEventListener('scroll', this.handleScroll)
    // const route = this.$route
    // if (route.hash !== '') {
    //   setTimeout(
    //     this.scrollTo(route.hash),
    //     2000
    //   )
    // }
    this.updateUrl(undefined, false, true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getSectionName (section) {
      const sectionName = (section.options && section.options.name && section.options.name[this.locale]) || section.name
      return sectionName
    },
    sectionHasContrib (section) {
      return section.options && section.options.contrib
    },
    scrollTo (anchorId, updateUrl = true) {
      // console.log('\n-C- IndexPage > scrollTo > anchorId :', anchorId)
      this.isAutoScrolling = true
      const element = document.querySelector(anchorId)
      // console.log('-C- IndexPage > scrollTo > element :', element)
      const topPosition = element.offsetTop - this.scrollMarginTop + 1
      // console.log('-C- IndexPage > scrollTo > topPosition :', topPosition)
      window.scrollTo({top: topPosition, behavior: 'smooth'})
      this.updateUrl(anchorId, false)
      this.isAutoScrolling = false
    },
    updateUrl (anchorId, isAutoScrolling, forceUpdate = false) {
      // console.log('\n-C- IndexPage > updateUrl > this.$route :', this.$route)
      // console.log('-C- IndexPage > updateUrl > anchorId :', anchorId)
      const currentHash = this.$route.hash
      // console.log('-C- IndexPage > updateUrl > currentHash :', currentHash)
      const newHash = anchorId
      let hashStr = ''
      if (newHash) {
        hashStr = newHash
      } else if (currentHash) {
        hashStr = currentHash
      }
      const currentQuery = { ...this.$route.query }
      currentQuery.locale = this.locale
      // console.log('-C- IndexPage > updateUrl > currentQuery :', currentQuery)
      const queryStr = 
        '?' +
        Object.keys(currentQuery)
          .map(key => {
            return `${key}=${encodeURIComponent(currentQuery[key])}`
          })
          .join('&')
      // console.log('-C- IndexPage > updateUrl > queryStr :', queryStr)
      if ( currentHash !== newHash && !isAutoScrolling) {
        // this.$router.replace({ hash: hashStr })
        history.pushState(
          {},
          null,
          `${this.$route.path}${queryStr}${hashStr}`
        )
      }
      if (forceUpdate) {
        history.pushState(
          {},
          null,
          `${this.$route.path}${queryStr}${hashStr}`
        )
      }
    },
    handleScroll (event) {
      this.scrollPositionY = Math.round(window.scrollY)
    },
    getContrastYIQ (hexcolor) {
      hexcolor = hexcolor.replace('#', '')
      const r = parseInt(hexcolor.substr(0, 2), 16)
      const g = parseInt(hexcolor.substr(2, 2), 16)
      const b = parseInt(hexcolor.substr(4, 2), 16)
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return (yiq >= 128) ? 'black' : 'white'
    },
    getElementBoundingBox(anchorId) {
      const element = document.querySelector(anchorId)
      // console.log('\n-C- IndexPage > getElementBoundingBox > element :', element)
      const offsetTop = element && element.offsetTop
      // console.log('-C- IndexPage > getElementBoundingBox > offsetPosition :', offsetTop)
      const boundingRect = element && element.getBoundingClientRect()
      // console.log('-C- IndexPage > getElementBoundingBox > boundingRect :', boundingRect)
      const Yposition = {
        id: anchorId,
        scrollPosAndMargin: this.scrollPosAndMargin,
        isActive: false
      }
      if (element) {
        Yposition.top = Math.round(boundingRect.top)
        Yposition.bottom = Math.round(boundingRect.bottom)
        Yposition.height = Math.round(boundingRect.height)
        Yposition.offTop = Math.round(offsetTop)
        Yposition.offBottom = Math.round(offsetTop) + Math.round(boundingRect.height) + this.interMarginY
        const topIn = this.scrollPosAndMargin > Yposition.offTop
        const bottomIn = this.scrollPosAndMargin < Yposition.offBottom
        Yposition.isActive = topIn && bottomIn
      }

      // console.log('-C- IndexPage > getElementBoundingBox > Yposition :', Yposition)
      return Yposition
    },
    isSectionActive (anchorId) {
      const box = this.getElementBoundingBox(anchorId)
      if (box.isActive) {
        this.activeSection = anchorId
        // this.updateUrl(anchorId, this.isAutoScrolling)
      }
      return box.isActive
    }
  }

}
</script>

<style scoped>

.multi-site-app {
  padding-left: .1em;
  padding-right: .1em;
}

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

<template>

  <div 
    v-if="currentRoute"
    id="multi-site-app-top"
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
      v-if="configColors"
      class="content-container">
      <!-- <pre><code>{{ config.data }}</code></pre>
      <br>{{ configPrimaryColor }} -->
      <style
        v-for="(cc, i) in customColors"
        :key="`custom-style-${i}-${cc.type}`">
        {{ cc.style }}
      </style>
    </div>

  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex' 

import matomo from '~/mixins/matomo'

// import Card from '~/components/Card'
// import ContentsSkeleton from '~/components/contents/ContentsSkeleton'

export default {
  name: 'IndexPage',
  components: {
    // Card,
    // ContentsSkeleton,
    Card: () => import(/* webpackChunkName: "Card" */ '~/components/Card.vue'),
    ContentsSkeleton: () => import(/* webpackChunkName: "ContentsSkeleton" */ '~/components/contents/ContentsSkeleton.vue')
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
      interMarginY: 11,
      defaultKeywords: [
        'multi', 'coop', 'multi.coop',
        'open', 'open source',
        'multi-site-app'
      ],
      colorTypes: [
        { type: 'primary', default: '#7957d5' },
        { type: 'link', default: '#7957d5' },
        { type: 'info', default: '#6fdcbf' },
        { type: 'success', default: '#03BD5B' },
        { type: 'warning', default: '#ff9947' },
        { type: 'danger', default: '#D1335B' }
        // primary: '#037988'
        // loading_color: '#6fdcbf'
        // accent: '#572a99'
        // secondary: '#6fdcbf'
        // info: '#53657D'
        // warning: '#ff9947'
        // error: '#D1335B'
        // success: '#03BD5B'
      ]
    }
  },
  head () { 
    const siteTitle = this.config.data.app_name
    const routeName = this.routeName
    const pageKeywords = this.routeKeywords
    const pageDescription = this.routeDescription ?? `${siteTitle} | ${routeName}`

    // cf : https://developers.google.com/search/docs/advanced/crawling/special-tags?hl=fr
    return {
      title: `${siteTitle} | ${ routeName }`,
      htmlAttrs: {
        lang: `${ this.locale }-${ this.locale.toUpperCase() }`
      },
      link: [
        {
          hid: 'icon',
          rel: 'icon',
          href: this.faviconUrl,
          type: 'image/x-icon'
        },
      ],
      meta: [
        {
          name: 'description',
          // hid: 'description',
          vmid: 'description',
          content: pageDescription.slice(0, 119)
        },
        {
          name: 'description',
          // hid: 'og:description',
          vmid: 'description',
          content: pageKeywords
        },
        {
          name: 'description',
          // hid: 'og:description',
          vmid: 'description',
          content: this.appKeywords
        },
        {
          name: 'keywords',
          // hid: 'keywords',
          content: pageKeywords
        },
        {
          name: 'keywords',
          // hid: 'keywords',
          content: this.appKeywords
        }
      ]
    }
  },
  // metaInfo() {
  //   // metaInfo is not working properly...
  //   return {
  //     title: this.config && this.config.data.app_name,
  //     titleTemplate: `%s | ${ this.getSectionName(this.currentRoute) }`,
  //     htmlAttrs: {
  //       lang: `${ this.locale }-${ this.locale.toUpperCase() }`
  //     },
  //     link: [
  //       { hid: 'icon', rel: 'icon', href: this.iconUrl, type: 'image/x-icon', },
  //     ]
  //   }
  // },
  computed: {
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      config: (state) =>  state.config,
      navbar: (state) =>  state.navbar,
      routes: (state) =>  state.routes,
      footer: (state) =>  state.footer,
      locale: (state) => state.locale,
      currentRoute: (state) =>  state.currentRoute
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
    faviconUrl () {
      // console.log('\n-C- IndexPage > faviconUrl > this.config.data :', this.config.data)
      // console.log('-C- IndexPage > faviconUrl > this.rawRoot :', this.rawRoot)
      // const faviconUrl = `${this.rawRoot}${this.config.data.app_favicon}`
      const faviconUrl = this.config.data.app_favicon
      // console.log('-C- IndexPage > faviconUrl > faviconUrl :', faviconUrl)
      return  faviconUrl || '/favicon_multi.io'
    },
    isHero () {
      return this.currentRoute.options && this.currentRoute.options.hero
    },
    routeHasContrib () {
      return this.currentRoute.options && this.currentRoute.options.contrib
    },
    configCustomCssFiles () {
      return this.config.data && this.config.data.custom_css_files
    },
    configColors () {
      // return this.config.data && this.config.data.colors
      return this.config.data && this.config.data.custom_colors && this.config.data.colors
    },
    customColors () {
      const colors = []
      this.configColors && this.colorTypes.forEach(t => {
        if (this.configColors[t.type]) {
          const customColor = this.configColors[t.type] || t.default
          let customStyle = `
            .button.is-${t.type}, .tag.is-${t.type} {
              background-color: ${ customColor } !important;
              color: ${ this.getContrastYIQ(customColor) } !important;
            }
            .button.is-${t.type}.is-outlined {
              border-color: ${ customColor } !important;
            }
            .is-${t.type}, .is-${t.type} {
              background-color: ${ customColor } !important;
              color: ${ this.getContrastYIQ(customColor) } !important;
            }
          `
          if (t.type === 'primary') {
            customStyle += `
            a:not(.navbar-link, .navbar-item, .credit-text) {
              color: ${ customColor };
            }
            .navbar-link, navbar-item {
              color: #4a4a4a !important;
            }
            .navbar-link:hover, .navbar-item:hover, a.navbar-item.is-active {
              color: ${ customColor } !important;
            }
            .tabs li > a {
              color: ${ customColor } !important;
            }
            .tabs li > a:hover {
              border-bottom-color : ${ customColor } !important;
            }
            .tabs li.is-active > a {
              font-weight: bold;
              border-bottom-color : ${ customColor } !important;
            }
            a:not(.navbar-link, .navbar-item, .button, .navbar-mobile-item) {
              text-decoration: underline;
            }
            .floating-menu-item > a, nav.tabs  > ul > li > a {
              text-decoration: none !important;
            }
            .menu-list a.is-active {
              background-color: ${ customColor } !important;
              color: ${ this.getContrastYIQ(customColor) } !important;
            }
            .b-slider.is-primary .b-slider-fill {
              background: ${ customColor } !important;
            }
            .has-text-primary {
              color: ${ customColor } !important;
            }
            .button.is-ghost {
              color: ${ customColor } !important;
            }
          `
          }
          colors.push({
            type: t.type,
            color: customColor,
            style: customStyle
          })
        }
      })
      return colors
    },
    // menuSections () {
    //   return this.currentRoute.sections.filter(section => !(section.options && section.options['not-in-menu']) )
    // }
    scrollPosAndMargin () {
      return this.scrollMarginTop + this.scrollPositionY
    },
    routeBrowser () {
      return this.$route
    },
    routeName () {
      const route = this.currentRoute
      const routeName = (route.options && route.options.name && route.options.name[this.locale]) || route.name
      return routeName
    },
    routeDescription () {
      const route = this.currentRoute
      const routeDescription = route.options && route.options.description && route.options.description[this.locale]
      return routeDescription
    },
    routeKeywords () {
      const route = this.currentRoute
      const siteKeywords = this.config.data.seo_keywords || ['multi', 'multi.coop']
      const routeKeywords = (route.options && route.options.keywords && route.options.keywords[this.locale]) || [route.name]
      const keywords = [
        ...routeKeywords,
        ...siteKeywords
        // this.config.data.app_name,
        // this.appTitle,
      ]
      return keywords.join(', ')
    },
    appKeywords () {
      const keywords = [
        ...this.defaultKeywords
      ]
      return keywords.join(', ')
    }
  },
  watch: {
    locale () {
      const hash = this.$route.hash
      // console.log('\n-C- IndexPage > watch > locale > hash :', hash)
      this.updateUrl(hash, false, true)
    },
    currentRoute (next) {
      // console.log('\n-C- IndexPage > watch > currentRoute > next :', next)
      this.trackEvent(next.url, 'ChangePage', 'Site')
    },
    routeBrowser (next) {
      // console.log('\n-C- IndexPage > watch > routeBrowser > next.path :', next.path)
      // console.log('-C- IndexPage > watch > routeBrowser > next.hash :', next.hash)
      // console.log('-C- IndexPage > watch > routeBrowser > next.query :', next.query)
      if (next.query.scrollto) {
        this.scrollTo(`#section-${next.query.scrollto}`, false)
      } else {
        this.scrollTo('#multi-site-app-top', false)
      }
    }
  },
  // beforeMount () {
  //   console.log('\n-C- IndexPage > beforeMount > ... ')
  //   console.log('-C- IndexPage > beforeMount > this.config : ', this.config)
  //   console.log('-C- IndexPage > beforeMount > this.locale : ', this.locale)
  //   console.log('-C- IndexPage > beforeMount > this.appTitle : ', this.appTitle)
  //   console.log('-C- IndexPage > beforeMount > this.currentRoute : ', this.currentRoute)
  // },
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
    // this.updateUrl(undefined, false, true)
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
      updateUrl && this.updateUrl(anchorId, false)
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
    getCustomColor (type) {
      return (this.configColors && this.configColors[type]) || '#7957d5' 
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

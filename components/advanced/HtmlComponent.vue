
<template>
  <div class="container">

    <!-- HTML CONTENTS -->
    <div
      v-if="html"
      class="content">
      <div
        v-html="html">
      </div>
    </div>

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'HtmlComponent',
  props: {
    sectionIndex: {
      default: null,
      type: Number
    },
    rawHtml: {
      default: undefined,
      type: String
    },
    sectionOptions: {
      default: undefined,
      type: Object
    },
    debug: {
      default: undefined,
      type: Boolean
    }
  },
  data() {
    return {
      // html: '<p class="has-text-centered">html is loading</p>',
      html: '',
      scriptsSrcs: [],
      css: []
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
      showdownOptions: 'getShowdownOptions',
    }),
    hasOptions () {
      return !!this.sectionOptions
    },
    hasColumnsOptions () {
      const hasOptions = this.hasOptions
      const hasColOptions = !!this.sectionOptions['columns-divider'] || !!this.sectionOptions['columns-size']
      return hasOptions && hasColOptions
    },
    content () {
      return this.rawHtml
    },
    columnsSize () {
      const colSize = this.sectionOptions['columns-size'] || 'half'
      return `is-${colSize}`
    },
    getBrowser () {
      const browserClient = navigator && navigator.userAgent
      // console.log('\n-C- HtmlComponent > getBrowser > browserClient :', browserClient)
      return browserClient || 'unknown'
    }
  },
  watch: {
    rawHtml (next) {
      if (next) {
        this.parseContent(next)
      }
    }
  },
  beforeMount () {
    if (this.rawHtml) {
      this.parseContent(this.rawHtml)
    }
  },
  methods: {
    parseContent (rawHtml) {
      console.log('\n-C- HtmlComponent > parseHtml > rawHtml :', rawHtml)
      const scriptStart = '<script'
      const scriptEnd = 'script>'
      const srcStart = 'src='
      const srcEnd = '.js'
      let dataContent = rawHtml.slice()

      // const browserClient = this.getBrowser
      // console.log('-C- HtmlComponent > parseHtml > browserClient :', browserClient)

      const regexScript = new RegExp(`(?:${scriptStart}).*(?:${scriptEnd})`, 'gs')
      const regexSrc = new RegExp(`(?:${srcStart}).*(?:${srcEnd})`, 'g')

      const splitStr = [...rawHtml.matchAll(regexScript)].map(m => m[0])
      console.log('-C- HtmlComponent > parseHtml > splitStr :', splitStr)

      const dataScripts = splitStr.map( scriptTag => {
        dataContent = dataContent.replace(scriptTag, '')
        const scriptObj = [...scriptTag.matchAll(regexSrc)]
          .map(m => {
            const rawStr = m[0]
            // console.log('-C- HtmlComponent > parseHtml > rawStr :', rawStr)
            const srcStr = rawStr.replace(srcStart, '').replace(/['"]+/g, '').replaceAll('\\', '')
            // console.log('-C- HtmlComponent > parseHtml > srcStr :', srcStr)
            return {
              tag: scriptTag,
              src: srcStr
            }
          })
          // console.log('-C- HtmlComponent > parseHtml > scriptObj :', scriptObj)
          return scriptObj[0]
      })
      // console.log('-C- HtmlComponent > parseHtml > dataScripts :', dataScripts)
      this.scriptsSrcs = dataScripts.map(m => m.src)
      this.html = dataContent
      // console.log('-C- HtmlComponent > parseHtml > this.html :', this.html)

      this.appendScripts()
    },
    appendScripts () {
      const scripts = this.scriptsSrcs
      scripts.forEach(src => {
        const scriptId = src.split('//')[1]
        const existingScript = document.getElementById(scriptId)
        if (!existingScript) {
          const script = document.createElement('script')
          script.src = src
          script.id = scriptId
          script.type = 'text/javascript'
          document.body.appendChild(script)

          script.onload = () => {
            this.debug && console.log('-C- HtmlComponent > appendScripts > scriptId >  :', scriptId)
          }
        }
      })
    }
  }
}
</script>

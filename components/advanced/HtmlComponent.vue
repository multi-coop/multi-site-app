
<template>
  <div class="container">

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="content"
      >
      <h1>
        HtmlComponent - {{ sectionIndex }}
      </h1>
      <div 
        v-if="sectionData"
        class="columns is-multiline " 
        >
        <div class="column is-half">
          sectionOptions: <br><code>
            <pre>
              {{ sectionOptions }}
            </pre>
          </code>
        </div>
        <div class="column is-half">
          sectionData.data: <br><code>
            <pre>
              {{ sectionData.data }}
            </pre>
          </code>
        </div>
        <div class="column is-half">
          sectionData.content: <br><code>
            <pre>
              {{ sectionData.content }}
            </pre>
          </code>
        </div>
      </div>
    </div>

    <!-- HTML CONTENTS -->
    <div
      v-if="sectionData"
      class="content">
      <div
        v-if="html"
        v-html="html">
      </div>
      
      <!-- DEBUGGING -->
      <div 
        v-if="debug"
        class="columns is-multiline">
        <div class="column is-6">
          sectionOptions: <pre></code>{{ sectionOptions }}</code></pre>
        </div>
        <div class="column is-6">
          scriptsSrcs : <br>
          <pre></code>{{ scriptsSrcs }}</code></pre>
        </div>
        <div class="column is-6">
          html : <br>
          <pre></code>{{ html }}</code></pre>
        </div>
        <div class="column is-6">
          sectionData.content : <br>
          <pre></code>{{ sectionData.content }}</code></pre>
        </div>
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
    sectionData: {
      default: undefined,
      type: Object
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
      return this.sectionData.content
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
    sectionData (next) {
      if (next) {
        this.parseContent(next)
      }
    }
  },
  methods: {
    parseContent (data) {
      // console.log('\n-C- HtmlComponent > parseHtml > data :', data)
      const scriptStart = '<script'
      const scriptEnd = 'script>'
      const srcStart = 'src='
      const srcEnd = '.js'
      let dataContent = data.content.slice()

      // const browserClient = this.getBrowser
      // console.log('-C- HtmlComponent > parseHtml > browserClient :', browserClient)

      const regexScript = new RegExp(`(?:${scriptStart}).*(?:${scriptEnd})`, 'gs')
      const regexSrc = new RegExp(`(?:${srcStart}).*(?:${srcEnd})`, 'g')

      const splitStr = [...data.content.matchAll(regexScript)].map(m => m[0])
      // console.log('-C- HtmlComponent > parseHtml > splitStr :', splitStr)

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
            console.log('-C- HtmlComponent > appendScripts > scriptId >  :', scriptId)
          }
        }
      })
    }
  }
}
</script>

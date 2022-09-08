
<template>
  <div class="container">

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="content"
      >
      <h1>
        TextComponent - {{ sectionIndex }}
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
        <div 
          v-if="hasOptions"
          class="column is-half"
          >
          contents: <br><code>
            <pre>
              {{ contents }}
            </pre>
          </code>
        </div>
      </div>
    </div>

    <!-- MD CONTENTS -->
    <div class="content">
      
      <!-- no options -->
      <VueShowdown
        v-if="!sectionOptions"
        :markdown="content"
        :flavor="showdownOptions.flavor"
        :options="showdownOptions.options"
        :extensions="showdownOptions.extensions"
      />

      <!-- render columns with options -->
      <div
        v-if="sectionOptions && hasColumnsOptions"
        class="columns is-multiline is-centered is-variable is-6"
        >
        <div 
          v-for="(splitContent, index) in contents"
          :key="`text-component-${sectionIndex}-col-${index}`"
          :class="`column ${columnsSize} mb-3 px-5`"
          >
          <VueShowdown
            :markdown="splitContent"
            :flavor="showdownOptions.flavor"
            :options="showdownOptions.options"
            :extensions="showdownOptions.extensions"
          />
        </div>
      </div>
    </div>

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'TextComponent',
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
      type: [Object, Array]
    },
    debug: {
      default: undefined,
      type: Boolean
    }
  },
  data() {
    return {
      splittersDict: {
        break: '\n',
        h1: '# ',
        h2: '## ',
        h3: '### ',
        h4: '#### ',
        h5: '##### ',
        h6: '###### ',
      }
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
    hasOptions() {
      return !!this.sectionOptions
    },
    hasColumnsOptions() {
      const hasOptions = this.hasOptions
      const hasColOptions = !!this.sectionOptions['columns-divider'] || !!this.sectionOptions['columns-size']
      return hasOptions && hasColOptions
    },
    content() {
      return this.sectionData.content
    },
    contents() {
      let contentsArray = []
      const re = /\r\n|\n\r|\n|\r/g
      const authorizedSplitters = Object.keys(this.splittersDict)
      const splitterCode = this.sectionOptions['columns-divider']

      if ( !authorizedSplitters.includes(splitterCode) ) {
        contentsArray = [ this.content ]
      } 
      else {
        // console.log('-C- TextComponent > contentSplit > this.content :', this.content)
        const splitter = this.splittersDict[splitterCode]
  
        // const contentTrimmed = this.content.startsWith('\n') ? this.content.substring(1) : this.content
        const contentTrimmed = this.content

        contentsArray = contentTrimmed
          .replace(re, '\n')
          .split( `\n${splitter}` )
          .filter(c => c !== '')
          .map( c => {
            const str = `${splitter}${c}`
            return str
          })
      }

      // console.log('-C- TextComponent > contentSplit > contentsArray :', contentsArray)
      return contentsArray
    },
    columnsSize() {
      const colSize = this.sectionOptions['columns-size'] || 'half'
      return `is-${colSize}`
    }
  },
}
</script>

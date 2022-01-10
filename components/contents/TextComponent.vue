
<template>
  <div>

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
        class="columns" 
        >
        <div class="column">
          sectionOptions: <br><code>
            <pre>
              {{ sectionOptions }}
            </pre>
          </code>
        </div>
        <div class="column">
          sectionData.data: <br><code>
            <pre>
              {{ sectionData.data }}
            </pre>
          </code>
        </div>
        <div class="column">
          sectionData.content: <br><code>
            <pre>
              {{ sectionData.content }}
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
        :options="showdownOptions"
      />

      <!-- render with options -->
      <div
        v-if="sectionOptions && sectionOptions.columns"
        class="columns is-multiline is-8"
        >
        <div 
          v-for="(splitContent, index) in contents"
          :key="`text-component-${sectionIndex}-col-${index}`"
          :class="`column ${columnsSize}`"
          >
          <VueShowdown
            :markdown="splitContent"
            :options="showdownOptions"
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
  props: [
    'sectionIndex',
    'sectionData',
    'sectionOptions',
    'debug'
  ],
  data() {
    return {
      splittersDict: {
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
          // .split(splitter)
          .replace(re, '\n')
          .split( `\n${splitter}` )
          .filter(c => c !== '')
          .map( c => {
            const str = `${splitter}${c}`
            return str
          })
      }

      console.log('-C- TextComponent > contentSplit > contentsArray :', contentsArray)
      return contentsArray
    },
    columnsSize() {
      const colSize = this.sectionOptions['columns-size'] || 'half'
      return `is-${colSize}`
    }
  },
}
</script>

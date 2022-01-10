
<template>
  <div class="">

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="content"
      >
      <h1>
        TextDataComponent - {{ sectionIndex }}
      </h1>
      <div 
        v-if="sectionData"
        class="columns is-multiline" 
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
        <div class="column is-half">
          dataContents: <br><code>
            <pre>
              {{ dataContents }}
            </pre>
          </code>
        </div>
        <div class="column is-half">
          sectionDataOptions: <br><code>
            <pre>
              {{ sectionDataOptions }}
            </pre>
          </code>
        </div>
      </div>
    </div>

    <!-- MD CONTENTS -->
    <div class="content">
      <VueShowdown
        :markdown="content"
        :options="showdownOptions"
      />
    </div>

    <div 
      class="content"
      v-for="(dataContent, index) in dataContents"
      :key="`text-data-component-${sectionIndex}-col-${index}`"
      >

      <!-- TITLES -->
      <h1
        v-if="isTitle(dataContent)"
        >
        {{ $translate(dataContent, dataDict, locale) }}
      </h1>

      <!-- SUBTITLES -->
      <h3
        v-else-if="isSubtitle(dataContent)"
        >
        {{ $translate(dataContent, dataDict, locale) }}
      </h3>

      <!-- SEPARATORS -->
      <hr
        v-else-if="isSeparator(dataContent)"
        class="my-4"
      />

      <!-- LABELS : VALUES -->
      <p v-else>
        <span
          :class="`${labelsClasses}`"
          >
          {{ $translate( formatContent(dataContent).key, dataDict, locale ) }} : 
        </span>
        {{ formatContent(dataContent).value }}
      </p>


    </div>

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'TextDataComponent',
  props: [
    'sectionIndex',
    'sectionData',
    'sectionOptions',
    'debug'
  ],
  data() {
    return {
      classesDict: {
        bold: 'has-text-weight-bold'
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
    sectionDataOptions() {
      return this.sectionData.data.options
    },
    dataDict() {
      return this.sectionData.data.dict
    },
    dataContents() {
      const contentsArray = this.sectionData.data.contents
      return contentsArray
    },
    labelsClasses() {
      const optionsClasses = this.sectionDataOptions['labels-classes']
      const classes = optionsClasses && optionsClasses.map( cl => {
        return this.classesDict[cl]
      }) || []
      return classes.join(' ')
    }
  },
  methods: {
    isTitle(dataContent) {
      console.log('-C- TextDataComponent > isTitle > dataContent : ', dataContent)
      const titles = this.sectionDataOptions.titles
      console.log('-C- TextDataComponent > isTitle > titles : ', titles)
      const check = titles && titles.includes(dataContent)
      return check
    },
    isSubtitle(dataContent) {
      const subtitles = this.sectionDataOptions.subtitles
      const check = subtitles && subtitles.includes(dataContent)
      return check
    },
    isSeparator(dataContent) {
      return dataContent === 'separator'
    },
    formatContent(dataContent) {
      const keyObj = Object.keys(dataContent)[0]
      return {
        key: keyObj,
        value: dataContent[keyObj]
      }
    }
  }
}
</script>

<template>
  <div class="mb-5">

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="content"
      >
      <h1>
        ContentsSkeleton - {{ sectionIndex }}
      </h1>
      <div class="columns">
        <div class="column">
          section: <br><code>
            <pre>
              {{ section }}
            </pre>
          </code>
        </div>
        <div class="column">
          sectionOptions: <br><code>
            <pre>
              {{ sectionOptions }}
            </pre>
          </code>
        </div>
      </div>

    </div>


    <LogoAnimated
      v-if="section.component === 'LogoAnimated' && sectionData"
      :sectionIndex="sectionIndex"
      :sectionData="sectionData"
      :sectionOptions="sectionOptions"
      :debug="false"
    />

    <TextComponent
      v-if="section.component === 'TextComponent' && sectionData"
      :sectionIndex="sectionIndex"
      :sectionData="sectionData"
      :sectionOptions="sectionOptions"
      :debug="false"
    />

    <DataGrid
      v-if="section.component === 'DataGrid' && sectionData"
      :sectionIndex="sectionIndex"
      :sectionData="sectionData"
      :sectionOptions="sectionOptions"
      :debug="false"
    />

    <TextDataComponent
      v-if="section.component === 'TextDataComponent' && sectionData"
      :sectionIndex="sectionIndex"
      :sectionData="sectionData"
      :sectionOptions="sectionOptions"
      :debug="false"
    />

  </div>
</template>


<script>
import matter from 'gray-matter'

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'ContentsSkeleton',
  props: [
    'section',
    'sectionIndex',
    'debug'
  ],
  components: {
    LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '~/components/contents/LogoAnimated.vue'),
    TextComponent: () => import(/* webpackChunkName: "TextComponent" */ '~/components/contents/TextComponent.vue'),
    TextDataComponent: () => import(/* webpackChunkName: "TextDataComponent" */ '~/components/contents/TextDataComponent.vue'),
    DataGrid: () => import(/* webpackChunkName: "DataGrid" */ '~/components/contents/DataGrid.vue'),
  },
  async mounted() {
    // console.log('-C- ContentsSkeleton > mounted > this.section :', this.section)
    if (this.section.files) {
      await this.getFileData()
    }
  },
  watch: {
    async locale(next) {
      // console.log('-C- ContentsSkeleton > watch > locale > next :', next)
       await this.getFileData()
    }
  },
  data() {
    return {
      sectionData: undefined,
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      localeFallback: (state) => state.localeFallback,
      gitInfos: (state) =>  state.gitInfos,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
    convertUrl() {
      const url = `${this.rawRoot}${this.section.files[this.locale] || this.section.files[this.localeFallback] }`
      return url
    },
    sectionOptions() {
      return this.section.options
    }
  },
  methods: {
    async getFileData() {
      const urlRaw = this.convertUrl
      // console.log('-C- ContentsSkeleton > getFileData > urlRaw :', urlRaw)
      const req = await this.$axios.get(urlRaw)
      const fileData = matter(req.data)
      this.sectionData = {
        data: fileData.data,
        content: fileData.content
      }
    }
  }

}
</script>

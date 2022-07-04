<template>
  <div class="mb-5 mt-3">

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
      :section-index="sectionIndex"
      :section-data="sectionData"
      :section-options="sectionOptions"
      :debug="false"
    />

    <TextComponent
      v-if="section.component === 'TextComponent' && sectionData"
      class="TextComponent"
      :section-index="sectionIndex"
      :section-data="sectionData"
      :section-options="sectionOptions"
      :debug="false"
    />

    <DataGrid
      v-if="section.component === 'DataGrid' && sectionData"
      :section-index="sectionIndex"
      :section-data="sectionData"
      :section-options="sectionOptions"
      :debug="false"
    />

    <TextDataComponent
      v-if="section.component === 'TextDataComponent' && sectionData"
      :section-index="sectionIndex"
      :section-data="sectionData"
      :section-options="sectionOptions"
      :debug="false"
    />

    <ButtonsComponent
      v-if="section.component === 'ButtonsComponent'"
      :section-index="sectionIndex"
      :section-options="sectionOptions"
      :debug="false"
    />

    <WidgetComponent
      v-if="section.component === 'WidgetComponent'"
      :section-index="sectionIndex"
      :section-options="sectionOptions"
      :debug="true"
    />

  </div>
</template>


<script>
import matter from 'gray-matter'

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'ContentsSkeleton',
  components: {
    LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '~/components/contents/LogoAnimated.vue'),
    TextComponent: () => import(/* webpackChunkName: "TextComponent" */ '~/components/contents/TextComponent.vue'),
    TextDataComponent: () => import(/* webpackChunkName: "TextDataComponent" */ '~/components/contents/TextDataComponent.vue'),
    DataGrid: () => import(/* webpackChunkName: "DataGrid" */ '~/components/contents/DataGrid.vue'),
    ButtonsComponent: () => import(/* webpackChunkName: "ButtonsComponent" */ '~/components/buttons/ButtonsComponent.vue'),
    WidgetComponent: () => import(/* webpackChunkName: "WidgetComponent" */ '~/components/advanced/WidgetComponent.vue'),
  },
  props: [
    'section',
    'sectionIndex',
    'debug'
  ],
  data() {
    return {
      sectionData: undefined,
    }
  },
  head () {
    return {
      link: [
      ],
      script: [
      ],
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
  watch: {
    async locale(next) {
      // console.log('-C- ContentsSkeleton > watch > locale > next :', next)
      if (this.section.files) {
        await this.getFileData()
      }
    }
  },
  async mounted() {
    console.log('\n-C- ContentsSkeleton > mounted > this.section :', this.section)
    if (this.section.files) {
      await this.getFileData()
    }
  },
  methods: {
    async getFileData() {
      const urlRaw = this.convertUrl
      console.log('\n-C- ContentsSkeleton > getFileData > urlRaw :', urlRaw)
      const req = await this.$axios.get(urlRaw)
      // console.log('-C- ContentsSkeleton > getFileData > req.data :', req.data)
      const fileData = matter(req.data)
      this.sectionData = {
        data: fileData.data,
        content: fileData.content
      }
    }
  }

}
</script>

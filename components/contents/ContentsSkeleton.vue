<template>
  <div class="mb-5">


    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="level"
      >

      <div class="columns">
        <div class="column">
          section: <br><code>
            <pre>
              {{ section }}
            </pre>
          </code>
        </div>
      </div>

    </div>


    <LogoAnimated
      v-if="section.component === 'LogoAnimated' && sectionData"
      :sectionData="sectionData"
      :debug="false"
    />

    <TextComponent
      v-if="section.component === 'TextComponent' && sectionData"
      :sectionData="sectionData"
      :debug="true"
    />

    <DataGrid
      v-if="section.component === 'DataGrid' && sectionData"
      :sectionData="sectionData"
      :debug="false"
    />

  <hr>
  </div>
</template>


<script>
import matter from 'gray-matter'

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'ContentsSkeleton',
  props: [
    'section',
    'debug'
  ],
  components: {
    LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '~/components/contents/LogoAnimated.vue'),
    TextComponent: () => import(/* webpackChunkName: "TextComponent" */ '~/components/contents/TextComponent.vue'),
    DataGrid: () => import(/* webpackChunkName: "DataGrid" */ '~/components/contents/DataGrid.vue'),
  },
  async mounted() {
    await this.getFileData()
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
      gitInfos: (state) =>  state.gitInfos,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
    convertUrl() {
      return `${this.rawRoot}${this.section.files[this.locale]}`
    },
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

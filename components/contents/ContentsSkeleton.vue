<template>
  <div class="mb-5">

    <div class="level">
      <code>
        <pre>
          {{ section }}
        </pre>
      </code>
    </div>

    <!-- <div class="level">
      <code>
        <pre>
          {{ sectionData }}
        </pre>
      </code>
    </div> -->

    <LogoAnimated
      v-if="section.component === 'LogoAnimated' && sectionData"
      :sectionData="sectionData"
    />

    <TextComponent
      v-if="section.component === 'TextComponent' && sectionData"
      :sectionData="sectionData"
    />

    <DataGrid
      v-if="section.component === 'DataGrid' && sectionData"
      :sectionData="sectionData"
    />

  <hr>
  </div>
</template>


<script>
import matter from 'gray-matter'

import { mapState } from 'vuex' 

export default {
  name: 'ContentsSkeleton',
  props: [
    'section'
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
    convertUrl() {
      return `${this.gitInfos.gitRawRoot}${this.section.files[this.locale]}`
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

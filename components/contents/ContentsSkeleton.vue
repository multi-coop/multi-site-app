<template>
  <div
    :id="`section-${section.name}`"
    :class="`content-skeleton ${sectionCustomClass}`">

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

    <!-- OPTION CONTRIBUTION BTN LINK -->
    <div
      v-if="contrib && isFile"
      class="content floating-contrib">
      <b-tooltip
        multilined
        class="icon-contrib"
        type="is-dark"
        size="is-large"
        position="is-left"
        >
        <template #content>
          <p class="mb-1">
            {{ $translate('contribText', dict) }}
          </p>
          <hr class="my-1">
          <p class="mb-1">
            {{ $translate('fileText', dict) }} :
            <b>{{ fileName }}</b>
          </p>
        </template>
        <b-button
          size="is-small"
          type="is-text"
          tag="a"
          :href="convertPublicUrl"
          target="_blank"
          @click="trackEvent(convertPublicUrl, 'ContribBtnToExtPage', 'Content'); trackLink(convertPublicUrl)">
          <b-icon
            icon="git"
            type="is-grey-lighter"
          />
        </b-button>
      </b-tooltip>
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
      :debug="false"
    />

    <HtmlComponent
      v-if="section.component === 'HtmlComponent'"
      class="HtmlComponent"
      :section-index="sectionIndex"
      :section-data="sectionData"
      :section-options="sectionOptions"
      :debug="false"
    />

  </div>
</template>


<script>
import matter from 'gray-matter'

import { mapState, mapGetters } from 'vuex' 

import matomo from '~/mixins/matomo'

export default {
  name: 'ContentsSkeleton',
  components: {
    LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '~/components/contents/LogoAnimated.vue'),
    TextComponent: () => import(/* webpackChunkName: "TextComponent" */ '~/components/contents/TextComponent.vue'),
    TextDataComponent: () => import(/* webpackChunkName: "TextDataComponent" */ '~/components/contents/TextDataComponent.vue'),
    DataGrid: () => import(/* webpackChunkName: "DataGrid" */ '~/components/contents/DataGrid.vue'),
    ButtonsComponent: () => import(/* webpackChunkName: "ButtonsComponent" */ '~/components/buttons/ButtonsComponent.vue'),
    WidgetComponent: () => import(/* webpackChunkName: "WidgetComponent" */ '~/components/advanced/WidgetComponent.vue'),
    HtmlComponent: () => import(/* webpackChunkName: "HtmlComponent" */ '~/components/advanced/HtmlComponent.vue'),
  },
  mixins: [matomo],
  props: {
    section: {
      default: undefined,
      type: Object
    },
    sectionIndex: {
      default: null,
      type: Number
    },
    contrib: {
      default: null,
      type: Boolean
    },
    debug: {
      default: null,
      type: Boolean
    }
  },
  data() {
    return {
      sectionData: undefined,
      dict: {
        contribText: {
          fr: 'Cliquez pour contribuer à améliorer cette section sur le repo',
          en: 'Click to contribute improving this section on the repository'
        },
        fileText: {
          fr: 'Fichier',
          en: 'File'
        }
      }
    }
  },
  // head () {
  //   return {
  //     link: [],
  //     script: []
  //   }
  // },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      localeFallback: (state) => state.localeFallback,
      gitInfos: (state) =>  state.gitInfos
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
      publicRoot : 'getGitPublicRoot'
    }),
    sectionFile () {
      return this.section.files && (this.section.files[this.locale] || this.section.files[this.localeFallback])
    },
    fileName () {
      return this.sectionFile && this.sectionFile.split('/').at(-1)
    },
    convertUrl () {
      const url = `${this.rawRoot}${this.sectionFile}`
      return url
    },
    convertPublicUrl () {
      const url = `${this.publicRoot}${this.sectionFile}`
      return url
    },
    sectionOptions () {
      return this.section.options
    },
    isFile () {
      const editableComponents = [
        'TextComponent',
        'DataGrid',
        'TextDataComponent',
        'HtmlComponent'
      ]
      return editableComponents.includes(this.section.component)
    },
    sectionCustomClass () {
      return (this.section.options && this.section.options['custom-class']) || 'mb-5 mt-3'
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
    // console.log('\n-C- ContentsSkeleton > mounted > this.section :', this.section)
    if (this.section.files) {
      await this.getFileData()
    }
  },
  methods: {
    async getFileData() {
      const urlRaw = this.convertUrl
      const isHtmlComponent = this.section.component === 'HtmlComponent'
      // isHtmlComponent && console.log('\n-C- ContentsSkeleton > getFileData > urlRaw :', urlRaw)
      const req = await this.$axios.get(urlRaw)
      // isHtmlComponent && console.log('-C- ContentsSkeleton > getFileData > req.data :', req.data)
      let sectionData
      if (isHtmlComponent) {
        sectionData = {
          content: req.data
        }
      } else {
        const fileData = matter(req.data)
        // isHtmlComponent && console.log('-C- ContentsSkeleton > getFileData > fileData :', fileData)
        // isHtmlComponent && console.log('-C- ContentsSkeleton > getFileData > fileData.content :', fileData.content)
        // isHtmlComponent && console.log('-C- ContentsSkeleton > getFileData > fileData.data :', fileData.data)
        sectionData = {
          data: fileData.data,
          content: fileData.content
        }

      }
      // isHtmlComponent && console.log('-C- ContentsSkeleton > getFileData > sectionData :', sectionData)
      this.sectionData = sectionData
    }
  }

}
</script>

<style scoped>
  .floating-contrib {
    float: right;
  }
  .icon-contrib {
    left: 20px;
    top: 20px;
  }
</style>

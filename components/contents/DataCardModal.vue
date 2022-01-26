

<template>

  <div 
    :class="`${fullScreen ? 'modal-card': 'card'}`"
    >

    <div
      :class="`${fullScreen ? 'modal-card-body px-5': 'card-content'}`"
      >

      <div 
        v-if="fullScreen"
        class="content mb-6"
        >
        <NavbarComponent/>
      </div>

      <div 
        v-if="fullScreen"
        class="content mb-0"
        >
        <div class="level">
          <div class="level-left">
          </div>
          <div class="level-right">
            <p
              class="level-item"
              >
              <b-button
                class="is-primary py-1 px-3"
                size="is-small"
                icon-right="close-thick"
                rounded
                @click="$parent.close()"
                @mouseover="hoverClose = true"
                @mouseleave="hoverClose = false"
                >
                <span
                  v-if="true"
                  class="has-text-weight-semibold"
                  >
                  {{ $translate('close', dict) }}
                </span>
              </b-button>
            </p>
          </div>
        </div>
      </div>


      <div 
        :class="`${fullScreen ? 'container' : '' } content`"
        >
        <div 
          :class="`columns ${fullScreen ? 'is-centered' : '' }`">

          <!-- COLUMN LEFT -->
          <div 
            v-if="modalConfigColLeft"
            class="column is-one-third"
            >

            <!-- COVER IMAGE -->
            <b-image
              v-if="imagesList"
              :src='convertUrl(imagesList[0])'
              :alt='itemData.name'
              :ratio="imagesRatio"
              :rounded="imagesRounded"
              class="mx-0 mb-4"
            />

            <!-- SOCIALS -->
            <nav 
              v-if="options && options['has-socials']"
              class="level is-mobile"
              >
              <div
                v-for="social in itemSocials"
                :key="social"
                class="level-item has-text-centered mb-2"
                >
                <div>
                  <p class="title mb-0 pb-1">
                    <a
                      :href="`${ social === 'email' ? 'mailto:' : '' }${ itemData[social] }`" 
                      class=""
                      >
                      <b-icon
                        size="is-normal"
                        :icon="social"
                      />
                    </a>
                  </p>
                  <p class="heading mb-0 is-6">
                    {{ social }}
                  </p>
                </div>
              </div>
            </nav>

          </div>

          <!-- COLUMN RIGHT -->
          <div 
            :class="`column ${fullScreen ? 'is-7-fullhd is-8-widescreen is-9-desktop is-10-tablet is-full-mobile' : ''}`">
            
            <!-- TITLE -->
            <h1 class="mt-4 mb-5 pb-1 has-text-centered">
              {{ itemData[titleKey] }}
            </h1>

            <!-- INFO TEXT MD DATA CONTENTS -->
            <div 
              v-if="infoDataTexts && infoDataTexts.length"
              class="notification px-4 pt-4"
              >
              <div class="columns is-centered">
                <div class="column">
                  <div
                    v-for="(dataText, idx) in infoDataTexts"
                    :key="`${sectionIndex}-${index}-info-data-text-${idx}-${dataText.key}`"
                    class=""
                    >
                    <DataTextsMd
                      :dataText="dataText"
                      :itemDict="itemDict"
                      :sectionIndex="sectionIndex"
                      :index="index"
                      :idx="idx"
                    />
                  </div>
                </div>
                <div class="column is-one-quarter is-v-centered pt-2 pb-1">
                  <b-button
                    size="is-small"
                    icon-left="open-in-new"
                    tag="a"
                    :href="sourceFile"
                    target="_blank"
                    >
                    {{ $translate('sourceFile', dict) }}
                  </b-button>
                </div>
              </div>
            </div>


            <!-- TAGS -->
            <p 
              v-for="(tagKey, idx) in options['tags-keys']"
              :key="`${sectionIndex}-${index}-tag-key-${idx}-${tagKey.key}`"
              class="mb-1 has-text-centered"
              >
              <b-tag 
                v-for="tag in itemData[tagKey.key]"
                :key="`${sectionIndex}-${index}-tag-${idx}-${tag}`"
                rounded
                :type="`is-${tagKey.color}`"
                class="has-text-weight-bold mx-1"
                >
                {{ $translate(tag, itemDict) }}
              </b-tag>
            </p>


            <!-- MD CONTENTS -->
            <div class="content mt-6 px-5">

              <VueShowdown
                :markdown="itemContent"
                :flavor="showdownOptions.flavor"
                :options="showdownOptions.options"
              />

              <DataTextsMd
                v-if="defaultDataText"
                :dataText="defaultDataText"
                :itemDict="itemDict"
                :sectionIndex="sectionIndex"
                :index="index"
                :idx="'dft'"
              />

            </div>

            <!-- {{ modalConfigColRight.tabs }} -->
            <!-- {{ defaultDataText }} <br> -->
            <!-- {{ dataTexts }} -->

            <!-- TABS -->
            <b-tabs 
              v-if="modalConfigColRight.tabs"
              position="is-centered"
              class="block mt-5"
              >
                
              <!-- GALLERY -->
              <b-tab-item 
                v-if="modalConfigColRight['images-gallery'] && modalConfigColRight['tabs'].includes('gallery')"
                :label="$translate('gallery', dict)"
                >
                <div 
                  class="columns is-centered has-background-grey-lighter mx-3 pb-4"
                  >
                  <div 
                    class="column is-8 is-10-tablet is-full-mobile content"
                    >
                    <DataGallery
                      :imagesListUrls="imagesListUrls"
                    />
                  </div>
                </div>
              </b-tab-item>

              
              <!-- CONTENTS -->
              <b-tab-item 
                v-if="modalConfigColRight"
                :label="$translate('infos', dict)"
                >
                <div class="content px-4 pt-4 pb-5">
                  <!-- MD DATA CONTENTS -->
                  <div
                    v-for="(dataText, idx) in otherDataTexts"
                    :key="`${sectionIndex}-${index}-data-text-${idx}-${dataText.key}`"
                    >
                    <DataTextsMd
                      :dataText="dataText"
                      :itemDict="itemDict"
                      :sectionIndex="sectionIndex"
                      :index="index"
                      :idx="idx"
                    />
                  </div>
                </div>
              </b-tab-item>


              <!-- LINKS -->
              <b-tab-item 
                v-if="modalConfigColRight['tabs'].includes('links')"
                :label="$translate('links', dict)"
                >
                <div class="content px-4 pt-4 pb-5">
                  <!-- MD DATA CONTENTS -->
                  <div
                    v-for="(dataLink, idx) in dataLinks"
                    :key="`${sectionIndex}-${index}-data-text-${idx}-${dataLink.key}`"
                    >
                    <DataTextsMd
                      :dataText="dataLink"
                      :itemDict="itemDict"
                      :sectionIndex="sectionIndex"
                      :index="index"
                      :idx="idx"
                      :asLink="true"
                    />
                  </div>
                </div>
              </b-tab-item>


            </b-tabs>


            <br>
            
          </div>
          
        </div>

      </div>


      <!-- DEBUG -->
      <div
        v-if="debug"
        class="content"
        >
        <div class="columns is-multiline">
          <div class="column is-half">
            options: <br>
            <code>
              <pre>
                {{ options }}
              </pre>
            </code>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataCardModal',
  components: {
    NavbarComponent: () => import(/* webpackChunkName: "NavbarComponent" */ '~/components/navbar/NavbarComponent.vue'),
    DataTextsMd: () => import(/* webpackChunkName: "DataTextsMd" */ '~/components/contents/DataTextsMd.vue'),
    DataGallery: () => import(/* webpackChunkName: "DataGallery" */ '~/components/contents/DataGallery.vue'),
  },
  props: [
    'modalReady',
    'sectionIndex',
    'index',
    'sourceFile',
    'itemData',
    'itemContent',
    'dataTexts',
    'dataLinks',
    'options',
    'itemDict',
    'titleKey',
    'imagesKey',
    'tagsKeys',
    'imagesRatio',
    'imagesList',
    'imagesRounded',
    'fullScreen',
    'debug',
  ],
  data() {
    return {
      socials: [ 'email', 'twitter', 'linkedin', 'github' ],
      hoverClose: false,
      dict: {
        gallery: {
          fr: 'Images',
          en: 'Images'
        },
        infos: {
          fr: 'Infos',
          en: 'Infos'
        },
        links: {
          fr: 'Liens',
          en: 'Links'
        },
        close: {
          fr: 'Fermer',
          en: 'Close'
        },
        sourceFile: {
          fr: 'Fichier source',
          en: 'Source file'
        }
      }
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      locales: (state) => state.locales,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
      showdownOptions: 'getShowdownOptions',
    }),
    itemKeys() {
      return Object.keys(this.itemData)
    },
    itemSocials() {
      const itemSocials = this.socials.filter( soc => this.itemKeys.includes(soc) )
      return itemSocials
    },
    modalConfig() {
      return this.options['card-modal-config']
    },
    modalConfigColLeft() {
      return this.modalConfig && this.modalConfig['column-left']
    },
    modalConfigColRight() {
      return this.modalConfig && this.modalConfig['column-right']
    },
    imagesListUrls() {
      const urlsArray = this.imagesList.map( path => {
        return { title: path, image: this.convertUrl(path) } 
      })
      return urlsArray
    },
    defaultDataText() {
      const hasDefaultDataText = this.modalConfigColRight['default-text']
      const defaultDataText = hasDefaultDataText && this.dataTexts.find( d => d.key === hasDefaultDataText)
      return defaultDataText
    },
    infoDataTexts() {
      const infoDataTextsKeys = this.modalConfig && this.modalConfig['infos-texts']
      const dataTexts = []
      if (infoDataTextsKeys) {
        infoDataTextsKeys.forEach( k => {
          const texts = this.locales.reduce((a, v) => ({ ...a, [v]: this.itemData[k]}), {}) 
          // .reduce( (a, v) => [v] = this.itemData[k],  ) 
          dataTexts.push( { key: k, text: texts } )
        })
      }
      return dataTexts
    },
    otherDataTexts() {
      const otherTexts = this.defaultDataText ? this.dataTexts.filter( t  => t.key !== this.defaultDataText.key ) : this.DataTexts
      return otherTexts
    }
  },
  methods: {
    convertUrl(url) {
      return `${this.rawRoot}${url}`
    },
    hasKey(str) {
      return Object.keys(this.itemData).includes(str)
    },
    isString(val) {
      const isStr = typeof val === 'string'
      return isStr
    },
  }
}
</script>



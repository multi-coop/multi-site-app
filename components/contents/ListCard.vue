<template>
  <div
    v-show="canShowCard"
    :class="`column is-full mb-2`"
    >

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="columns is-multiline"
      >
      <div class="column is-half">
        <p>
          options:
          <br>
          <code>
            <pre>
              {{ options }}
            </pre>
          </code>
        </p>
      </div>
      <div class="column is-half">
        <!-- <p>
          file: {{ file }}
        </p> -->
        <!-- <p>
          content:
          <br>
          <code>
            <pre>
              {{ content }}
            </pre>
          </code>
        </p> -->
      </div>
      <div class="column is-half">
        <p>
          data:
          <br>
          <code>
            <pre>
              {{ data }}
            </pre>
          </code>
        </p>
      </div>
    </div>

    <div 
      v-if="data"
      class="card"
      >
      
      <!-- CONTENT -->
      <div 
        :class="`card-content px-2 py-4`"
        >

        <div
          class="columns is-vcentered is-centered"
          >
          
          <!-- COVER -->
          <div
            class="column is-2"
            >
            <a 
              :href="data.link"
              @click="trackEvent(data.link, 'GoToPage', 'Content')"
              >
              <figure class="image is-justify-content-center">
                <img
                  :src='data[ illustrationKey ]'
                  :alt='data[ illustrationKey ]'
                  class="illustration"
                  :style="`
                    max-height: ${illustrationHeight} !important;
                  `"
                />
              </figure>
            </a>
          </div>

          <!-- TITLE -->
          <div
            class="column is-5 px-4"
            >
            <a
              class="is-size-5 has-text-weight-bold"
              :href="data.link"
              @click="trackEvent(data.link, 'GoToPage', 'Content')"
              >
              {{ data[titleKey] }}
            </a>
            <h3
              v-if="subtitleKey"
              class=""
              >
              {{ data[ subtitleKey ] }}
            </h3>
            <p
              v-if="authorKey"
              class="mt-2 is-italic"
              >
              {{ data[ authorKey ] }}
            </p>
          </div>

          <!-- TAGS -->
          <div
            class="column is-3"
            >
            <div 
              v-if="options['tags-keys']"
              class="content"
              @click="openModal()"
              >
              <b-taglist
                v-for="(tagKey, idx) in options['tags-keys']"
                :key="`${sectionIndex}-${index}-tag-key-${idx}-${tagKey.key}`"
                class="mb-0"
                >
                <b-tag 
                  v-for="tag in data[tagKey.key]"
                  :key="`${sectionIndex}-${index}-tag-${idx}-${tag}`"
                  rounded
                  :type="`is-${tagKey.color}`"
                  class="has-text-weight-bold"
                  >
                  {{ trimString( $translate(tag, itemDict), 25) }}
                </b-tag>
              </b-taglist>
            </div>
          </div>

          <!-- LINK -->
          <div
            class="column is-1 has-text-centered"
            >
            <a 
              :href="data.link"
              @click="trackEvent(data.link, 'GoToExtLink', 'Content')"
              >
              <b-icon
                icon="link-variant"
                size="is-medium"
              />
            </a>
            <!-- <div 
              class="content is-size-6-touch"
              >
              <VueShowdown
                :markdown="content"
                :flavor="showdownOptions.flavor"
                :options="showdownOptions.options"
              />
            </div> -->
          </div>
        </div>
      </div>


      <!-- MINIATURE KEYS -->
      <!-- <div 
        v-if="miniatureKeys.length"
        class="card-content pt-0"
        >
        <hr class="mb-2">
        <ul
          >
          <li 
            v-for="key in miniatureKeys"
            :key="key"
            >
            <span class="has-text-weight-bold">
              {{ $translate(key, itemDict) }} :
            </span>
            <span>
              {{ data[ key ]}}
            </span>
          </li>
        </ul>
      </div> -->

    </div>


  </div>
</template>


<script>

import matter from 'gray-matter'

import { mapState, mapGetters, mapActions } from 'vuex' 

import matomo from '~/mixins/matomo'

export default {
  name: 'ListCard',
  components: {
  },
  mixins: [matomo],
  props: [
    'sectionIndex',
    'file',
    'options',
    'itemDict',
    'colSize',
    'index',
    'preOpenItem',
    'debug',
  ],
  data() {
    return {
      // images: undefined,
      data: {},
      content: '',
      showMore: false,
      showModal: false,
      modalReady: false,
      socials: [ 'email', 'twitter', 'linkedin', 'github' ],
      defaultDict: {
        readmore: {
          fr: 'Lire plus',
          en: 'Read more'
        },
        readless: {
          fr: 'Lire moins',
          en: 'Read less'
        }
      },
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
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
      publicRoot: 'getGitPublicRoot',
      showdownOptions: 'getShowdownOptions',
      isSelectionActivated: 'data/isSelectionActivated',
      canShowItem: 'data/canShowItem',
    }),
    urlFile() {
      return this.convertUrl(this.file)
    },
    contentSplit() {
      let contentsArray = [ this.content, '' ]
      const re = /\r\n|\n\r|\n|\r/g
      const authorizedSplitters = Object.keys(this.splittersDict)
      const splitterCode = this.options['readmore-divider'] || 'break'
      const defaultSplitter = this.splittersDict.break
      
      // console.log('-C- ListCard > contentSplit > this.content :', this.content)
      
      if ( authorizedSplitters.includes(splitterCode) ) {

        const splitter = this.splittersDict[splitterCode]
        const contentTrimmed = this.content.startsWith(defaultSplitter) ? this.content.substring(1) : this.content
        // contentsArray = this.content
        contentsArray = contentTrimmed
          .replace(re, defaultSplitter)
          .split(splitter)
          // .filter(c => c !== '')
          // .map( c => {
          //   const str = `${splitter}${c}`
          //   return str
          // })
      }

      return {
        resume: contentsArray[0],
        readMore: contentsArray[1] ? contentsArray.splice(1).join('') : ''
      }
    },
    titleKey() {
      return this.options['title-key'] || 'name'
    },
    subtitleKey() {
      return this.options['subtitle-key']
    },
    authorKey() {
      return this.options['author-key']
    },
    illustrationKey() {
      return this.options['illustration-key']
    },
    illustrationHeight() {
      return this.options['illustration-height'] || '45px'
    },
    // imagesKey() {
    //   return this.options['images-key']
    // },
    tagsKeys() {
      return this.options['tags-keys'] || []
    },
    // miniatureKeys() {
    //   let minKeys = this.options['miniature-keys'] || []
    //   const tagsKeys = this.tagsKeys.map( t => t.key )
    //   minKeys = minKeys.filter(  k => !tagsKeys.includes(k) )
    //   return minKeys
    // },
    // imagesList() {
    //   let imagesArray
    //   const dataImages = this.data[ this.imagesKey ]
    //   // console.log('-C- ListCard > imagesList > dataImages :', dataImages)
    //   if (typeof dataImages === 'string' ) {
    //     imagesArray = [ dataImages ]
    //   } else {
    //     imagesArray = dataImages
    //   }
    //   return imagesArray
    // },
    itemKeys() {
      return Object.keys(this.data)
    },
    itemSocials() {
      const itemSocials = this.socials.filter( soc => this.itemKeys.includes(soc) )
      return itemSocials
    },
    dataTextsKeys() {
      return this.options['texts-keys']
    },
    dataTexts() {
      const dataTexts = []
      if (this.dataTextsKeys) {
        this.dataTextsKeys.forEach( k => {
          dataTexts.push( { key: k, text: this.data[k] } )
        })
      }
      return dataTexts
    },
    dataLinksKeys() {
      return this.options['links-keys']
    },
    dataLinks() {
      const dataLinks = []
      if (this.dataLinksKeys) {
        this.dataLinksKeys.forEach( k => {
          dataLinks.push( { key: k, text: this.data[k] } )
        })
      }
      return dataLinks
    },
    modalConfig() {
      return this.options['card-modal-config']
    },
    canShowCard() {
      const selectionActivated = this.isSelectionActivated
      const tagsKeys = this.tagsKeys.map( k => k.key )
      if ( selectionActivated ) {
        return this.canShowItem( tagsKeys, this.data)
      } else {
        return true
      }
    }

  },
  watch: {
    data(next) {
      const tagsToAdd = []
      // console.log('-C- ListCard > watch > this.options :', this.options)
      // console.log('-C- ListCard > watch > this.tagsKeys :', this.tagsKeys)
      this.tagsKeys.forEach( tagKey => {
        const tagsArray = next[tagKey.key]
        const tagsObj = {
          key: tagKey.key,
          tags: tagsArray.map( t => {
            return { name: t }
          })
        }
        // console.log('-C- ListCard > watch > tagsObj :', tagsObj)
        tagsToAdd.push(tagsObj)
      })
      // console.log('-C- ListCard > watch > tagsToAdd :', tagsToAdd)
      this.$store.dispatch('data/setAvailableTags', tagsToAdd)
      this.showModal = this.preOpenItem === this.file
    },
    showModal(next) {
      this.changeUrl(!next)
    }
  },
  async mounted() {
    await this.getFileData()
  },
  methods: {
    ...mapActions({
      setAvailableTags: 'data/setAvailableTags'
    }),
    convertUrl(url) {
      return `${this.rawRoot}${url}`
    },
    convertUrlPublic(url) {
      return `${this.publicRoot}${url}`
    },
    async getFileData() {
      const urlRaw = this.urlFile
      // console.log('\n-C- ListCard > getFileData > urlRaw :', urlRaw)
      const req = await this.$axios.get(urlRaw)
      const fileData = matter(req.data)
      // console.log('-C- ListCard > getFileData > fileData :', fileData)
      this.data = fileData.data
      this.content = fileData.content
      this.modalReady = true
      // console.log('-C- ListCard > getFileData > fileData.data :', fileData.data)
      // console.log('-C- ListCard > getFileData > fileData.content :', fileData.content)

    },
    trimString(str, max) {
      const strTrimmed = str.length >= max ? `${str.slice(0, max)}...` : str
      return strTrimmed
    },
    changeUrl(reset) {
      // console.log('\n-C- ListCard > openModal > reset :', reset)
      const queryItem = reset ? {} : { item: this.file }
      this.$router.push({path: this.$route.path, query: queryItem})
    },

  }

}
</script>

<style scoped>
  figure {
    display: flex;  
  }
  .illustration {
    width: auto; 
  }
  /* .max-height {
    height: 160px !important;
    max-height: 160px !important;
    width: auto; 
  } */
</style>

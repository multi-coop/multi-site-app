<template>
  <div>

    <!-- DEBUG -->
    <div 
      v-if="debug"
      class="level"
      >
      <div class="columns">
        <div class="column ">
          <!-- <p>
            file: {{ file }}
          </p> -->
          <p>
            content:
            <br>
            <code>
              <pre>
                {{ content }}
              </pre>
            </code>
          </p>
          <!-- <p>
            data:
            <br>
            <code>
              <pre>
                {{ data }}
              </pre>
            </code>
          </p> -->
        </div>
      </div>
    </div>


    <div class="card">

      <header class="card-header has-text-centered">
        <h3 class="card-header-title">
          {{ data[titleKey] }}
        </h3>
      </header>

      <div 
        v-if="coverKey"
        class="card-image"
        >
        <b-image
          :src='convertUrl(data[coverKey])'
          :alt='data.name'
          :ratio="coverRatio"
        />
      </div>
      
      <div class="card-content">
        
        <div 
          v-if="options['tags-keys']"
          class="content"
          >

          <b-taglist
            v-for="tagKey in options['tags-keys']"
            :key="`${index}-tag-key-${tagKey.key}`"
            >
            <b-tag 
              v-for="tag in data[tagKey.key]"
              :key="`${index}-${tag}`"
              rounded
              :type="`is-${tagKey.color}`"
              class="has-text-weight-bold"
              >
              {{ tag }}
            </b-tag>
          </b-taglist>
        </div>

        <div class="content">

          <div 
            v-if="options && options['has-readmore']"
            >
            <!-- resume -->
            <VueShowdown
              :markdown="contentSplit.resume"
              :options="{ emoji: true }"
            />

            <!-- read more -->
            <VueShowdown
              v-show="showMore"
              :markdown="contentSplit.readMore"
              :options="{ emoji: true }"
            />

            <!-- button more -->
            <p>
              <b-button 
                type="is-primary" 
                size="is-small"
                class="mt-3"
                outlined
                expanded
                @click="showMore = !showMore"
                >
                <span v-if="!showMore">
                  {{ defaultDict.readmore[locale] }}
                </span>
                <span v-if="showMore">
                  {{ defaultDict.readless[locale] }}
                </span>
              </b-button>
            </p>

          </div>
          <div v-else>
            <VueShowdown
              :markdown="content"
              :options="{ emoji: true }"
            />
          </div>

        </div>

      </div>


      <footer
        v-if="options && options['has-socials']"
        class="card-footer"
        >
        <a
          v-if="hasKey('email')"
          :href="`mailto: ${data.email}`" 
          class="card-footer-item"
          >
          <b-icon
            icon="email"
          />
        </a>
        <a
          v-if="hasKey('twitter')"
          :href="data.twitter" 
          class="card-footer-item"
          >
          <b-icon
            icon="twitter"
          />
        </a>
        <a
          v-if="hasKey('linkedin')"
          :href="data.linkedin" 
          class="card-footer-item"
          >
          <b-icon
            icon="linkedin"
          />
        </a>
        <a
          v-if="hasKey('github')"
          :href="data.github" 
          class="card-footer-item"
          >
          <b-icon
            icon="github"
          />
        </a>

      </footer>

    </div>

    <!-- MODAL -->
    <b-modal 
      v-model="showModal" 
      :width="640"
      scroll="keep"
      >
      <DataCardModal
      />
    </b-modal>

  </div>
</template>


<script>

import matter from 'gray-matter'

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataCard',
  components: {
    DataCardModal: () => import(/* webpackChunkName: "DataCardModal" */ '~/components/contents/DataCardModal.vue'),
  },
  props: [
    'file',
    'options',
    'dict',
    'selected',
    'index',
    'debug',
  ],
  data() {
    return {
      tags: [],
      data: {},
      content: '',
      showMore: false,
      showModal: false,
      defaultDict: {
        readmore: {
          fr: 'Lire plus',
          en: 'Read more'
        },
        readless: {
          fr: 'Lire moins',
          en: 'Read less'
        }
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
    }),
    contentSplit() {
      const content = this.content.split('</p>')
      return {
        resume: `${content[0]}</p>`,
        readMore: content.splice(1).join('') 
      }
    },
    titleKey() {
      return this.options['title-key'] || 'name'
    },
    coverKey() {
      return this.options['cover-key']
    },
    coverRatio() {
      return this.options['cover-ratio'] || '4by4'
    }
  },
  async mounted() {
    await this.getFileData(this.file)
  },
  methods: {
    convertUrl(url) {
      return `${this.rawRoot}${url}`
    },
    async getFileData(url) {
      const urlRaw = this.convertUrl(url)
      // console.log('-C- DataCard > getFileData > urlRaw :', urlRaw)
      const req = await this.$axios.get(urlRaw)
      const fileData = matter(req.data)
      // console.log('-C- DataCard > getFileData > fileData :', fileData)
      this.data = fileData.data
      this.content = fileData.content
      // console.log('-C- DataCard > getFileData > fileData.content :', fileData.content)
    },
    hasKey(str) {
      return Object.keys(this.data).includes(str)
    }
  }

}
</script>
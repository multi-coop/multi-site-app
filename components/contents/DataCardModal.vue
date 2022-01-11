<template>

  <div class="card">

    <div
      class="card-content"
      >

      <div class="content">
        
        <div class="columns">

          <div class="column is-one-third">
            <!-- IMAGE -->
            <b-image
              v-if="imagesList"
              :src='convertUrl(imagesList[0])'
              :alt='itemData.name'
              :ratio="imagesRatio"
              :rounded="imagesRounded"
              class="mx-0"
            />
            <!-- SOCIALS -->
            <nav 
              v-if="options && options['has-socials']"
              class="level"
              >
              <div
                v-for="social in itemSocials"
                :key="social"
                class="level-item has-text-centered"
                >
                <div>
                  <p class="title mb-0">
                    <a
                      :href="`${itemData[social]}`" 
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

          <div class="column pr-6">
            
            <h1 class="mt-4 mb-5 pb-1 has-text-centered">
              {{ itemData[titleKey] }}
            </h1>

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

            <br>

            <VueShowdown
              :markdown="itemContent"
              :options="showdownOptions"
            />


            <div
              v-for="(dataText, idx) in dataTexts"
              :key="`${sectionIndex}-${index}-data-text-${idx}-${dataText.key}`"
              >

              <p>
                <h4>
                  {{ $translate(dataText.key, itemDict) }} :
                </h4>

                <span v-if="isString(dataText.text[locale])">
                  <!-- {{ dataText.text[locale] }} -->
                  <VueShowdown
                    :markdown="dataText.text[locale]"
                    :options="showdownOptions"
                  />
                </span>

                <ul v-else>
                  <li 
                    v-for="(dataTxtli, idxLi) in dataText.text[locale]"
                    :key="`${sectionIndex}-${index}-data-text-${idx}-${dataText.key}-${idxLi}`"
                    class="pb-1"
                    >
                    {{ dataTxtli }}
                  </li>
                </ul>

              </p>

            </div>

          </div>
          
        </div>

      </div>



      <div class="content">



      </div>

    </div>

  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataCardModal',
  props: [
    'modalReady',
    'sectionIndex',
    'index',
    'itemData',
    'itemContent',
    'dataTexts',
    'options',
    'itemDict',
    'titleKey',
    'imagesKey',
    'tagsKeys',
    'imagesRatio',
    'imagesList',
    'imagesRounded',
    'debug',
  ],
  data() {
    return {
      socials: [ 'email', 'twitter', 'linkedin', 'github' ],
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
    itemKeys() {
      return Object.keys(this.itemData)
    },
    itemSocials() {
      const itemSocials = this.socials.filter( soc => this.itemKeys.includes(soc) )
      return itemSocials
    },
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
    }
  }
}
</script>

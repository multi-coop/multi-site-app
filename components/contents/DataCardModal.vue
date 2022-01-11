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
            
            <nav class="level mb-2">
              <div class="level-item has-text-centered">
                <div class="">
                  <h1 class="mt-4 mb-5">
                    {{ itemData[titleKey] }}
                  </h1>
                </div>
              </div>
              <!-- <div class="level-right">
                <div class="level-item">
                  <b-icon
                    size="is-normal"
                    icon="close"
                    @click="$emit('close')"
                  />
                </div>
              </div> -->
            </nav>

            <nav 
              v-for="(tagKey, idx) in options['tags-keys']"
              :key="`${sectionIndex}-${index}-tag-key-${idx}-${tagKey.key}`"
              class="level mb-0"
              >
              <div 
                class="level-item has-text-centered"
                >
                <b-taglist
                  class="mb-2 has-text-centered"
                  >
                  <b-tag 
                    v-for="tag in itemData[tagKey.key]"
                    :key="`${sectionIndex}-${index}-tag-${idx}-${tag}`"
                    rounded
                    :type="`is-${tagKey.color}`"
                    class="has-text-weight-bold"
                    >
                    {{ $translate(tag, itemDict) }}
                  </b-tag>
                </b-taglist>
              </div>
            </nav>

            <br>

            <VueShowdown
              :markdown="itemContent"
              :options="showdownOptions"
            />

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
  }
}
</script>

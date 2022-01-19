<template>

  <div class="columns">

    <div class="column is-one-quarter pb-0">
      <div class="content">
        <h4 class="mb-0">
          {{ $translate(dataText.key, itemDict) }}
        </h4>
      </div>
    </div>

    <div class="column is-three-quarters">
      <div class="content">

        <div 
          v-if="isString(dataText.text[locale])"
          class="is-size-6-touch"
          >
          <VueShowdown
            :markdown="dataText.text[locale]"
            :options="showdownOptions"
          />
        </div>

        <p 
          v-if="!isString(dataText.text[locale])"
          class="mt-0 pt-0"
          >

          <ul 
            v-if="!asLink"
            class="mt-0 pt-0"
            >
            <li 
              v-for="(dataTxtLi, idxLi) in dataText.text[locale]"
              :key="`${sectionIndex}-${index}-data-text-${idx}-${dataText.key}-${idxLi}`"
              class="pb-0"
              >
              <span >
                {{ dataTxtLi }}
              </span>
            </li>
          </ul>

          <span 
            v-if="asLink"
            class="mt-0 pt-0"
            >
            <div 
              v-for="(dataTxtLi, idxLi) in dataText.text"
              :key="`${sectionIndex}-${index}-data-text-${idx}-${dataText.key}-${idxLi}`"
              class="level mt-0 mb-2 pt-0 pb-0"
              >
              <div class="level-left">
                <b-icon
                  icon="open-in-new"
                  size="is-small"
                  class="mr-4"
                />
                <a 
                  :href="dataTxtLi.link"
                  target="_blank"
                  >
                  {{ dataTxtLi[locale] }}
                </a>
              </div>
            </div>
          </span>

        </p>

      </div>
    </div>

  </div>

</template>


<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'DataTextsMd',
  props: [
    'sectionIndex',
    'index',
    'idx',
    'dataText',
    'itemDict',
    'asLink',
  ],
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
    }),
    ...mapGetters({
      showdownOptions: 'getShowdownOptions',
    }),
  },
  methods: {
    isString(val) {
      const isStr = typeof val === 'string'
      return isStr
    },
  }
}

</script>

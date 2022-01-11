<template>

  <div class="columns">

    <div class="column is-one-quarter">
      <p class="mb-2">
        <h4>
          {{ $translate(dataText.key, itemDict) }}
        </h4>
      </p>
    </div>

    <div class="column is-three-quarters">
      <p class="mb-2 mt-0">

        <!-- {{ dataText }} -->

        <span v-if="isString(dataText.text[locale])">
          <VueShowdown
            :markdown="dataText.text[locale]"
            :options="showdownOptions"
          />
        </span>

        <div v-if="!isString(dataText.text[locale])">

          <ul 
            v-if="!asLink"
            class="mt-0 pt-0"
            >
            <li 
              v-for="(dataTxtLi, idxLi) in dataText.text[locale]"
              :key="`${sectionIndex}-${index}-data-text-${idx}-${dataText.key}-${idxLi}`"
              class="pb-1"
              >
              <span >
                {{ dataTxtLi }}
              </span>
            </li>
          </ul>

          <ul 
            v-else
            class="mt-0 pt-0"
            >
            <li 
              v-for="(dataTxtLi, idxLi) in dataText.text"
              :key="`${sectionIndex}-${index}-data-text-${idx}-${dataText.key}-${idxLi}`"
              class="pb-1"
              >
              <a 
                :href="dataTxtLi.link"
                target="_blank"
                >
                {{ dataTxtLi[locale] }}
              </a>
            </li>
          </ul>

        </div>

      </p>
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

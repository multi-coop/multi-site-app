<template>

  <div 
    :class="`columns is-multiline is-centered ${sectionOptions['custom-classes']}`"
    >
    <div 
      :class="`column is-${sectionOptions['columns-size']}-desktop is-full-tablet`"
      >

      <!-- DEBUG -->
      <div 
        v-if="debug"
        class="column is-full"
        >
        <h1>
          ButtonsComponent - {{ sectionIndex }}
        </h1>
        <div 
          class="columns is-multiline " 
          >
          <div class="column is-half">
            sectionOptions: <br><code>
              <pre>
                {{ sectionOptions }}
              </pre>
            </code>
          </div>
        </div>
      </div>

      <!-- BUTTONS -->
      <div 
        class="columns is-multiline is-centered"
        >
        <div
          v-for="btn in sectionOptions.buttons"
          :key="btn.link"
          :class="`column is-${sectionOptions['buttons-size']}`"
          >
          <b-button 
            v-if="isInternalLink(btn)"
            :type="`is-${ btn.color || 'primary' }`" 
            :to="{path: btn.link}"
            :icon-left="btn['icon-left']"
            :rounded="btn.rounded"
            :outlined="btn.outlined"
            tag="router-link"
            expanded
            @click="trackEvent(btn.link, 'BtnToIntPage', 'Content')"
            >
            {{ $translate('label', btn) }}
          </b-button>
          <a 
            v-else
            type="button"
            :class="`button is-fullwidth ${btn.rounded ? 'is-rounded' : ''} ${btn.outlined ? 'is-outlined' : ''}  is-${ btn.color || 'primary' }`" 
            :href="btn.link"
            @click="trackEvent(btn.link, 'BtnToExtPage', 'Content'); trackLink(btn.link)"
            >
            <b-icon
              :icon="btn['icon-left']"
              size="is-small"
              class="mr-2"
              >
            </b-icon>
            {{ $translate('label', btn) }}
          </a>
        </div>
      </div>

    </div>
  </div>

</template>


<script>
import { mapState } from 'vuex' 

import matomo from '~/mixins/matomo'

export default {
  name: 'ButtonsComponent',
  mixins: [matomo],
  // props: [
  //   'sectionIndex',
  //   'sectionOptions',
  //   'debug'
  // ],
  props: {
    sectionIndex: {
      default: null,
      type: Number
    },
    // sectionData: {
    //   default: undefined,
    //   type: Object
    // },
    sectionOptions: {
      default: undefined,
      type: Object
    },
    debug: {
      default: undefined,
      type: Boolean
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    })
  },
  methods: {
    isInternalLink(btn) {
      const link = btn.link
      return link.startsWith('/')
    }
  }
}
</script>

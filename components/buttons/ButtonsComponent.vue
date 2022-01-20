<template>

  <div 
    :class="`columns is-multiline is-centered ${sectionOptions['custom-classes']}`"
    >
    <div 
      :class="`column is-${sectionOptions['columns-size']}`"
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
            :type="`is-${ btn.color || 'primary' }`" 
            :to="{path: btn.link}"
            :icon-left="btn['icon-left']"
            :rounded="btn.rounded"
            :outlined="btn.outlined"
            tag="router-link"
            expanded
            >
            {{ $translate('label', btn) }}
          </b-button>
        </div>
      </div>

    </div>
  </div>

</template>


<script>
import { mapState } from 'vuex' 

export default {
  name: 'ButtonsComponent',
  props: [
    'sectionIndex',
    'sectionOptions',
    'debug'
  ],
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
}
</script>

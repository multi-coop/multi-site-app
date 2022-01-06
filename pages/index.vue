<template>

  <div>
    <!-- <section class="section">

      <div class="columns is-mobile">

        <card title="Free" icon="github">
          Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
        </card>

        <card title="Responsive" icon="cellphone-link">
          <b class="has-text-grey"> Every </b> component is responsive
        </card>

        <card title="Modern" icon="alert-decagram">
          Built with <a href="https://vuejs.org/"> Vue.js </a> and
          <a href="http://bulma.io/"> Bulma </a>
        </card>

        <card title="Lightweight" icon="arrange-bring-to-front">
          No other internal dependency
        </card>

      </div>
    </section> -->

    <section class="section">
      <div class="columns is-mobile">

        <card title="config obj" icon="">
          <code>
            <pre>
              {{ config.data }}
            </pre>
          </code>
        </card>

        <card title="navbar obj" icon="">
          <code>
            <pre>
              {{ navbar.data }}
            </pre>
          </code>
        </card>

        <card title="test" icon="">
          <VueShowdown
            :markdown="config.content"
            :options="{ emoji: true }"
          />
        </card>

      </div>
    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex' 

import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  components: {
    Card,
  },
    computed: {
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
        config: (state) =>  state.config,
        navbar: (state) =>  state.navbar,
      }),
    },
}
</script>

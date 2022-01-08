<template>

  <div class="mb-6">

    <section 
      class="section"
      v-if="currentRoute"
      >

      <div class="container mb-4"
        v-for="section in currentRoute.sections"
        :key="section.name"
        >
        <ContentsSkeleton 
          :section="section"
          :debug="false"
        />
      </div>

    </section>

    <section 
      v-show="debug"
      class="section"
      >
      <div class="columns is-mobile">

        <card title="config obj" icon="">
          <code>
            <pre>
              {{ config.data }}
            </pre>
          </code>
        </card>

        <card title="config md content" icon="">
          <VueShowdown
            :markdown="config.content"
            :options="{ emoji: true }"
          />
        </card>


        <card title="footer obj" icon="">
          <code>
            <pre>
              {{ footer.data }}
            </pre>
          </code>
        </card>

      </div>
    </section>

    <section 
      v-show="debug"
      class="section"
      >
      <div class="columns is-mobile">

        <card title="routes obj" icon="">
          <code>
            <pre>
              {{ routes.data }}
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


      </div>
    </section>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex' 

import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  head () { 
    return {
      title: this.config.data.app_name,
      link: [
        { rel: 'icon', href: this.iconUrl, sizes: '32x32' },
      ],
    }
  },
  components: {
    Card,
    ContentsSkeleton: () => import(/* webpackChunkName: "ContentsSkeleton" */ '~/components/contents/ContentsSkeleton.vue'),
  },
  data () {
    return {
      debug: false,
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      config: (state) =>  state.config,
      navbar: (state) =>  state.navbar,
      routes: (state) =>  state.routes,
      footer: (state) =>  state.footer,
      locale: (state) => state.locale,
      currentRoute: (state) =>  state.currentRoute,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
    iconUrl() {
      return `${this.rawRoot}${this.config.data.app_icon}`
    }

  }


}
</script>

<template>
  <div
    class=""
    >

    <!-- navbar -->
    <NavbarComponent/>

    <!-- menu left -->
    <section class="main-content columns">
      <!-- <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <NuxtLink :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside> -->

      <div class="container column is-10">
        <Nuxt />
      </div>

    </section>

    <!-- footers -->
    <FooterComponent/>
    <CreditsFooter/>

  </div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
  name: 'DefaultLayout',
  components: {
    NavbarComponent: () => import(/* webpackChunkName: "NavbarComponent" */ '~/components/navbar/NavbarComponent.vue'),
    FooterComponent: () => import(/* webpackChunkName: "FooterComponent" */ '~/components/footer/FooterComponent.vue'),
    CreditsFooter: () => import(/* webpackChunkName: "CreditsFooter" */ '~/components/footer/CreditsFooter.vue'),
  },
  data() {
    return {
      // items: [
      //   {
      //     title: 'Home',
      //     icon: 'home',
      //     to: { name: 'index' },
      //   },
      //   {
      //     title: 'Inspire',
      //     icon: 'lightbulb',
      //     to: { name: 'inspire' },
      //   },
      // ],
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      navbar: (state) =>  state.navbar,
    }),
  },
}
</script>

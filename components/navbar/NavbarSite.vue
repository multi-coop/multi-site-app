<template>
    
  <nav
    class="NavbarSite navbar has-navbar-centered is-fixed-top"
    role="navigation"
    aria-label="main navigation">
    <!-- BRAND -->
    <div class="navbar-brand">
      <router-link
        class="navbar-item"
        :to="{ path: '/?locale=' + locale }"
        @click.native="trackEvent(true, 'ClickBrand', 'Navbar')">
        <img
          :src="convertUrlImage(navbar.data['logo-left'])"
          width="auto"
          height=".9em">
        <span
          v-if="config.data.show_app_name"
          class="ml-3 is-size-5 has-text-weight-bold">
          {{ config.data.app_name }}
        </span>
      </router-link>

      <!-- BURGER -->
      <a
        :class="`navbar-burger ${showMobileMenu ? 'is-active' : ''}`"
        role="button"
        aria-label="menu"
        aria-expanded="false"
        data-target="multiSiteAppNavbar"
        @click="showMobileMenu = !showMobileMenu; trackEvent(showMobileMenu, 'ToggleBurger', 'Navbar')">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- MENUS -->
    <div id="multiSiteAppNavbar" class="navbar-menu">
      <!-- START -->
      <div
        v-if="navbar.data['buttons-left']"
        class="navbar-start">
        <!-- LOOP -->
        <NavbarItem
          v-for="(item, idx) in navbar.data['buttons-left']"
          :key="`nabar-item-left-${idx}-${item.name}`"
          :item="item"/>
      </div>

      <!-- END -->
      <div
        v-if="navbar.data['buttons-right']"
        class="navbar-end">
        <!-- LOOP -->
        <NavbarItem
          v-for="(item, idx) in navbar.data['buttons-right']"
          :key="`nabar-item-right-${idx}-${item.name}`"
          :item="item"
          :is-right="true"/>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div 
      v-show="showMobileMenu"
      class="navbar-mobile-menu is-fixed-top is-hidden-desktop has-background-white-ter mt-0 px-6">
      <div class="navbar-mobile-menu-content columns is-centered py-4">
        <!-- LEFT -->
        <div 
          v-if="navbar.data['buttons-left']"
          class="column is-5">
          <b-menu>
            <b-menu-list>
              <NavbarItemMobile
                v-for="(item, idx) in navbar.data['buttons-left']"
                :key="`nabar-item-right-${idx}-${item.name}`"
                :item="item"
                :item-id="`${idx}-${item.name}`"
                :active-item="activeItemMobile"
                @updateMenu="updateMobileMenu"
                @updateShowMenu="updateShowMobileMenu"/>
            </b-menu-list>
          </b-menu>
        </div>
        <!-- RIGHT -->
        <div
          v-if="navbar.data['buttons-right']"
          class="column is-5">
          <b-menu>
            <b-menu-list>
              <NavbarItemMobile
                v-for="(item, idx) in navbar.data['buttons-right']"
                :key="`nabar-item-right-${idx}-${item.name}`"
                :item="item"
                :item-id="`${idx}-${item.name}`"
                :active-item="activeItemMobile"
                @updateMenu="updateMobileMenu"
                @updateShowMenu="updateShowMobileMenu"/>
            </b-menu-list>
          </b-menu>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>

import { mapState } from 'vuex' 

import links from '~/mixins/links'
import matomo from '~/mixins/matomo'

export default {
  name: 'NavbarSite',
  components: {
    NavbarItem: () => import(/* webpackChunkName: "NavbarItem" */ '~/components/navbar/NavbarItem.vue'),
    NavbarItemMobile: () => import(/* webpackChunkName: "NavbarItemMobile" */ '~/components/navbar/NavbarItemMobile.vue')
  },
  mixins: [
    links,
    matomo
  ],
  data () {
    return {
      showMobileMenu: false,
      activeItemMobile: undefined
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      config: (state) => state.config,
      navbar: (state) =>  state.navbar
    })
  },
  methods: {
    updateMobileMenu (ev) {
      // console.log('\n-C- NavbarSite > updateMobileMenu > ev :', ev)
      this.activeItemMobile = ev
    },
    updateShowMobileMenu (ev) {
      // console.log('\n-C- NavbarSite > updateShowMobileMenu > ev :', ev)
      this.showMobileMenu = ev
    }
  }
}
</script>

<style scoped>
  .navbar-mobile-menu {
    /* box-shadow: 0 15px 10px 2px lightgrey; */
    box-shadow: 0 8px 16px hsla(0,0%,4%,.2);
    max-height: 75%;
    overflow: hidden;
  }
  .navbar-mobile-menu.is-fixed-top {
    top: 52px;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 90;
  }
  .navbar-mobile-menu-content {
    overflow-y: auto;
  }
</style>

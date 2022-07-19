<template>
    
  <nav
    class="navbar has-navbar-centered is-fixed-top"
    role="navigation"
    aria-label="main navigation">
    <!-- BRAND -->
    <div class="navbar-brand">
      <router-link
        class="navbar-item"
        :to="{ path: '/?locale=' + locale }">
        <img
          :src="getLink(navbar.data['logo-left'])"
          width="auto"
          height=".9em">
      </router-link>

      <!-- BURGER -->
      <a
        :class="`navbar-burger ${showMobileMenu ? 'is-active' : ''}`"
        role="button"
        aria-label="menu"
        aria-expanded="false"
        data-target="multiSiteAppNavbar"
        @click="showMobileMenu = !showMobileMenu">
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
                @closeMenu="updateShowMobileMenu"/>
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
                @closeMenu="updateShowMobileMenu"/>
            </b-menu-list>
          </b-menu>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'NavbarSite',
  components: {
    NavbarItem: () => import(/* webpackChunkName: "NavbarItem" */ '~/components/navbar/NavbarItem.vue'),
    NavbarItemMobile: () => import(/* webpackChunkName: "NavbarItemMobile" */ '~/components/navbar/NavbarItemMobile.vue'),
  },
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
      navbar: (state) =>  state.navbar,
      gitInfos: (state) =>  state.gitInfos,
    }),
    ...mapGetters({
      rawRoot: 'getGitRawRoot',
    })
  },
  methods: {
    getLink (link) {
      const srcLink = link && link.startsWith('./') ? `${this.rawRoot}${link}` : link
      return srcLink
    },
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

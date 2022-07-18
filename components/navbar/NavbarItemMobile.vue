<template>

  <b-menu-item
    v-if="!item.disabled"
    :active="isActive"
    class="navbar-mobile-item"
    :tag="itemTag"
    :to="isSimpleLink && { path: item.link, query: { locale: locale } }"
    :href="isExtLink && item.link"
    :target="isExtLink && '_blank'"
    @click="clickMenu(isDropdown || isLocaleSwitch)"
    >

    <template #label>
      <b-icon
        v-if="item.icon && !item.image"
        class="mr-2"
        size="is-small"
        :icon="item.icon"
        />
      <img
        v-if="item.image"
        class="navbar-multi-img mr-2"
        :src="item.image"
        />
      <span
        v-if="!isLocaleSwitch"
        :class="isCurrentRoute(item) ? 'has-text-weight-bold' : ''">
        {{ $translate('label', item) }}
      </span>
      <span v-else>
        <b-icon
          class="mr-2"
          size="is-small"
          icon="translate"
          />
        {{ localesDict[locale] }}
      </span>
    </template>

    <!-- DROPDOWNS -->
    <template
      v-if="item.component === 'dropdownLink'">
      <li
        v-for="(sub, idx) in submenuItems"
        :key="`sub-${idx}-${sub.name}`"
        class="navbar-mobile-item"
        >
        <b-button
          :class="`has-text-left my-0 py-0 px-1 submenu ${isCurrentRoute(sub) ? 'has-text-weight-bold' : ''}`"
          type="is-text"
          :tag="sub.component === 'simpleLink' ? 'router-link' : 'a'"
          :to="sub.component === 'simpleLink' && { path: sub.link, query: { locale: locale } }"
          :href="sub.component === 'extLink' && sub.link"
          :target="sub.component === 'extLink' && '_blank'"
          @click="clickMenu(false)"
          @mouseover="hover = `sub-${idx}-${sub.name}`"
          @mouseleave="hover = undefined"
          >
          {{ $translate('label', sub) }}
        </b-button>
      </li>
    </template>

    <!-- LOCALES -->
    <template
      v-if="item.component === 'switchLocaleDropdown'">
      <li
        v-for="loc in locales"
        :key="loc"
        class="navbar-mobile-item">
        <b-button
          :class="`has-text-left my-0 py-0 px-1 submenu ${loc === locale ? 'has-text-weight-bold' : ''}`"
          type="is-text"
          tag="a"
          @click="changeLocale(loc)"
          @mouseover="hover = loc"
          @mouseleave="hover = undefined"
          >
          <span class="is-uppercase">
            {{ loc }}
          </span>
          -
          {{ localesDict[loc] }}
        </b-button>
      </li>
    </template>

  </b-menu-item>

</template>


<script>
import { mapState, mapActions } from 'vuex' 

export default {
  name: 'NavbarItemMobile',
  props: [
    'item'
  ],
  data () {
    return {
      isActive: false,
      hover: undefined
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      locales: (state) => state.locales,
      localesDict: (state) => state.localesDict,
      navbar: (state) =>  state.navbar,
    }),
    isSimpleLink () {
      return this.item.component === 'simpleLink'
    },
    isExtLink () {
      return this.item.component === 'extLink'
    },
    isDropdown () {
      return this.item.component === 'dropdownLink'
    },
    isLocaleSwitch () {
      return this.item.component === 'switchLocaleDropdown'
    },
    itemTag () {
      let tag
      switch (this.item.component) {
        case 'simpleLink':
          tag = 'router-link'
          break
        case 'extLink':
          tag = 'a'
          break
        default:
          break
      }
      return tag
    },
    submenuItems () {
      return this.item.submenu.filter(i => !i.separator)
    }
  },
  methods: {
    ...mapActions({
      updateLocale: 'updateLocale',
    }),
    changeLocale(loc) {
      // console.log('\n-C- NavbarItemMobile > changeLocale > loc :', loc)
      // console.log('-C- NavbarItemMobile > changeLocale > this.$route :', this.$route)
      this.updateLocale(loc)
    },
    clickMenu (ignore=false) {
      this.isActive = !this.isActive
      if (!ignore) {
        this.$emit('closeMenu')
      }
    },
    isCurrentRoute (item) {
      const currentPath = this.$route.path
      const isPathLink = currentPath === item.link
      const subLinks = item.submenu && item.submenu.map(sl => sl.link)
      const isPathSubLink = subLinks && subLinks.includes(currentPath)
      return isPathLink || isPathSubLink
    }
  }
}
</script>

<style scoped>

.navbar-multi-img {
  max-height: 1em !important;
}
ul > li {
  padding-bottom: 0;
}
.button.submenu {
  height: 1.75em;
}
</style>

<style>

li.navbar-mobile-item > a {
  text-decoration: none !important;
} 

</style>

<template>

  <b-menu-item
    v-if="!item.disabled"
    class="navbar-mobile-item"
    :active="isExpanded"
    :expanded="isExpanded"
    :tag="itemTag"
    :to="isSimpleLink && buildTo(item)"
    :href="isExtLink && item.link"
    :target="isExtLink && '_blank'"
    @click.native="clickMenu(item); trackEvent(isExpanded, 'clickBurger', 'Navbar')"
    >

    <template #label>
      <!-- DEBUGGING -->
      <!-- <div>
        activeItem: <code>{{ activeItem }}</code>
      </div> -->
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
        <NavbarItemTag :item="item"/>
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
          :to="sub.component === 'simpleLink' && buildTo(sub)"
          :href="sub.component === 'extLink' && sub.link"
          :target="sub.component === 'extLink' && '_blank'"
          @click.native="clickMenu(sub); trackEvent(sub.link, sub.component === 'extLink' ? 'GoToExtPage' : 'GoToPage', 'Navbar')"
          @mouseover="hover = `sub-${idx}-${sub.name}`"
          @mouseleave="hover = undefined"
          >
          <NavbarItemTag :item="sub"/>
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
          @click="changeLocale(loc); trackEvent(loc, 'changeLocale', 'Navbar')"
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

import matomo from '~/mixins/matomo'
import navbar from '~/mixins/navbar'

export default {
  name: 'NavbarItemMobile',
  components: {
    NavbarItemTag: () => import(/* webpackChunkName: "NavbarItemTag" */ '~/components/navbar/NavbarItemTag.vue')
  },
  mixins: [matomo, navbar],
  props: {
    item: {
      default: undefined,
      type: Object
    },
    itemId: {
      default: null,
      type: String
    },
    activeItem: {
      default: undefined,
      type: String
    }
  },
  data () {
    return {
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
    },
    isExpanded () {
      return this.itemId === this.activeItem
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
    clickMenu (item) {
      // console.log('\n-C- NavbarItemMobile > clickMenu > item :', item)
      // console.log('-C- NavbarItemMobile > clickMenu > this.isLocaleSwitch :', this.isLocaleSwitch)
      this.$emit('updateMenu', this.itemId)
      if (item.component !== 'dropdownLink' ) {
        this.$emit('updateShowMenu', this.isLocaleSwitch || !!item.submenu)
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

<template>
  
  <div>

    <div
      v-if="!item.disabled"> 

      <!-- ITEMS - INTERNAL LINK -->
      <b-navbar-item 
        v-if="item.component === 'simpleLink'"
        :to="buildTo(item)"
        tag="router-link"
        class="is-size-7-touch navbar-multi"
        @click.native="trackEvent(item.link, 'GoToPage', 'Navbar')"
        >
        <b-tooltip
          v-if="item.icon || item.image"
          :label="$translate('label', item)"
          position="is-left"
          type="is-dark">
          <b-icon
            v-if="item.icon && !item.image"
            :icon="item.icon"
            class="mr-1"
            size="is-small"
            />
          <img
            v-if="item.image"
            class="navbar-multi-img"
            :src="item.image"
            />
          <span
            v-if="item.label_after_icon"
            :class="isCurrentRoute(item) ? 'has-text-weight-bold' : ''">
            {{ $translate('label', item) }}
          </span>
        </b-tooltip>
        <span
          v-if="!item.image"
          :class="isCurrentRoute(item) ? 'has-text-weight-bold' : ''">
          {{ $translate('label', item) }}
        </span>
      </b-navbar-item>


      <!-- ITEMS - EXTERNAL LINK -->
      <b-navbar-item 
        v-if="item.component === 'extLink'"
        :href="item.link"
        target="_blank"
        tag="a"
        class="is-size-7-touch navbar-multi"
        @click="trackEvent(item.link, 'GoToExtPage', 'Navbar'); trackLink(item.link)"
        >
        <b-tooltip
          v-if="item.icon || item.image"
          :label="$translate('label', item)"
          position="is-left"
          type="is-dark">
          <b-icon
            v-if="item.icon && !item.image"
            :icon="item.icon"
            :class="item.label_after_icon ? 'mr-1' : ''"
            :size="item.label_after_icon ? 'is-small' : ''"
            />
          <img
            v-if="item.image"
            class="navbar-multi-img"
            :src="item.image"
            />
          <span
            v-if="item.label_after_icon">
            {{ $translate('label', item) }}
          </span>
        </b-tooltip>
        <span v-else>
          {{ $translate('label', item) }}
        </span>
      </b-navbar-item>

      <!-- DROPDOWNS -->
      <b-navbar-dropdown 
        v-if="item.component === 'dropdownLink'"
        :arrowless="item.options.includes('arrowless')"
        :hoverable="item.options.includes('hoverable')"
        :right="isRight"
        class="is-size-7-touch navbar-multi"
        >
        <template #label>
          <div>
            <b-icon
              v-if="item.icon && !item.image"
              :icon="item.icon"
              class="mr-1"
              size="is-small"
              />
            <img
              v-if="item.image"
              class="navbar-multi-img"
              :src="item.image"
              />
            <span
              v-if="!item.image"
              :class="isCurrentRoute(item) ? 'has-text-weight-bold' : ''">
              {{ $translate('label', item) }}
            </span>
          </div>
        </template>

        <div
          v-for="(subItem, idx) in item.submenu"
          :key="`${idx}-${subItem.name}`"
          >
          <!-- ANY LINK EXCEPT SEPARATOR -->
          <b-navbar-item
            v-if="subItem.component !== 'extLink'"
            :to="!subItem.separator && buildTo(subItem)"
            :separator="subItem.separator"
            :tag="subItem.separator ? 'hr' : 'router-link'"
            :class="`${subItem.separator ? 'navbar-divider py-0' : 'is-size-7-touch'} ${isCurrentRoute(subItem) ? 'has-text-weight-bold' : ''}`"
            :active="!subItem.separator && subItem.link === $route.path"
            @click.native="trackEvent(subItem.link, 'GoToPage', 'Navbar')"
            >
            <span
              v-if="!subItem.separator"
              :class="`${ subItem.link === $route.path ? 'has-text-weight-bold' : '' }`">
              {{ $translate('label', subItem) }}
            </span>
          </b-navbar-item>

          <!-- EXT LINK -->
          <b-navbar-item
            v-if="subItem.component === 'extLink'"
            :href="subItem.link"
            tag="a"
            :class="`${subItem.separator ? 'navbar-divider py-0' : 'is-size-7-touch'}`"
            @click.native="trackLink(subItem.link)"
            >
            <span>
              {{ $translate('label', subItem) }}
            </span>
          </b-navbar-item>
        </div>

      </b-navbar-dropdown>


      <!-- LOCALES -->
      <b-navbar-dropdown 
        v-if="item.component === 'switchLocaleDropdown'"
        arrowless
        hoverable
        right
        class="mr-4 is-size-7-touch"
        >
        <template #label>
          <span class="is-uppercase">
            {{ locale }}
          </span>
        </template>

        <b-navbar-item 
          v-for="loc in locales"
          :key="loc"
          :value="loc === locale"
          aria-role="listitem"
          :class="`is-size-7-touch ${loc === locale ? 'has-text-weight-bold' : ''}`"
          @click="changeLocale(loc); trackEvent(loc, 'changeLocale', 'Navbar')"
          >
          {{ localesDict[loc] }}
        </b-navbar-item>

      </b-navbar-dropdown>

    </div>

  </div>

</template>


<script>
import { mapState, mapActions } from 'vuex' 

import matomo from '~/mixins/matomo'
import navbar from '~/mixins/navbar'

export default {
  name: 'NavbarItem',
  mixins: [matomo, navbar],
  // props: [
  //   'item',
  //   'isRight',
  //   'isMobile'
  // ],
  props: {
    item: {
      default: undefined,
      type: Object
    },
    isRight: {
      default: false,
      type: Boolean
    },
    isMobile: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      locales: (state) => state.locales,
      localesDict: (state) => state.localesDict,
      navbar: (state) =>  state.navbar
    })
  },
  methods: {
    ...mapActions({
      updateLocale: 'updateLocale',
    }),
    changeLocale(loc) {
      // console.log('\n-C- NavbarItem > changeLocale > loc :', loc)
      // console.log('-C- NavbarItem > changeLocale > this.$route :', this.$route)
      this.updateLocale(loc)
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
  /* padding-top: .1em !important; */
  max-height: 1.4em !important;
}

</style>

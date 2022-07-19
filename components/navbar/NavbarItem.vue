<template>
  
  <div>

    <div
      v-if="!item.disabled"> 

      <!-- ITEMS - INTERNAL LINK -->
      <b-navbar-item 
        v-if="item.component === 'simpleLink'"
        :to="{ path: item.link }"
        tag="router-link"
        class="is-size-7-touch navbar-multi"
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
        >
        <b-tooltip
          v-if="item.icon || item.image"
          :label="$translate('label', item)"
          position="is-left"
          type="is-dark">
          <b-icon
            v-if="item.icon && !item.image"
            :icon="item.icon"
            />
          <img
            v-if="item.image"
            class="navbar-multi-img"
            :src="item.image"
            />
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

        <b-navbar-item
          v-for="(subItem, idx) in item.submenu"
          :key="`${idx}-${subItem.name}`"
          :to="!subItem.separator && { path: subItem.link }"
          :separator="subItem.separator"
          :tag="subItem.separator ? 'hr' : 'router-link'"
          :class="`${subItem.separator ? 'navbar-divider py-0' : 'is-size-7-touch'} ${isCurrentRoute(subItem) ? 'has-text-weight-bold' : ''}`"
          :active="!subItem.separator && subItem.link === $route.path"
          >
          <span
            v-if="!subItem.separator"
            :class="`${ subItem.link === $route.path ? 'has-text-weight-bold' : '' }`">
            {{ $translate('label', subItem) }}
          </span>
        </b-navbar-item>

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
          @click="changeLocale(loc)"
          >
          {{ localesDict[loc] }}
        </b-navbar-item>

      </b-navbar-dropdown>

    </div>

  </div>

</template>


<script>
import { mapState, mapActions } from 'vuex' 

export default {
  name: 'NavbarItem',
  props: [
    'item',
    'isRight',
    'isMobile'
  ],
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      locales: (state) => state.locales,
      localesDict: (state) => state.localesDict,
      navbar: (state) =>  state.navbar,
    }),
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

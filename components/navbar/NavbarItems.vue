<template>
  
  <div style="display: flex">

    <div 
      v-for="item in items"
      :key="item.name"
      style="display: flex"
      >

      <div 
        v-if="!item.disabled"
        style="display: flex"
        > 

        <!-- ITEMS - INTERNAL LINK -->
        <b-navbar-item 
          v-if="item.component === 'simpleLink'"
          :to="{ path: item.link }"
          tag="router-link"
          class="is-size-7-touch navbar-multi"
          @click="trackEvent(item.link, 'GoToPage', 'Navbar')"
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
            v-if="!item.image">
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
          @click="trackEvent(item.link, 'GoToExtPage', 'Navbar'); trackLink(item.url)"
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
            <span v-if="item.append_label_to_icon">
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
                v-if="!item.image">
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
            :class="subItem.separator ? 'navbar-divider py-0' : 'is-size-7-touch'"
            :active="!subItem.separator && subItem.link === $route.path"
            @click="subItem.separator && trackEvent(subItem.link, 'GoToExtPage', 'Navbar')"
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
            class="is-size-7-touch"
            @click="changeLocale(loc)"
            >
            {{ localesDict[loc] }}
          </b-navbar-item>

        </b-navbar-dropdown>




        <!-- <b-navbar-item 
          tag="div"
          v-if="item.component === 'switchLocaleDropdown'"
          >
          <b-dropdown 
            :triggers="['hover']" 
            aria-role="list"
            position="is-bottom-center"
            >
            <template #trigger>
              <b-button
                type="is-primary"
                :rounded="item.options.includes('rounded')"
                size="is-small"
                >
                <strong class="is-uppercase">
                  {{ locale }}
                </strong>
              </b-button>
            </template>

            <b-dropdown-item 
              v-for="loc in locales"
              :key="loc"
              :value="loc === locale"
              aria-role="listitem"
              >
              {{ localesDict[loc] }}
            </b-dropdown-item>

          </b-dropdown>
        </b-navbar-item> -->

      </div>

    </div>

  </div>

</template>


<script>
import { mapState, mapActions } from 'vuex' 

export default {
  name: 'NavbarItems',
  // props: [
  //   'items',
  //   'isRight'
  // ],
  props: {
    items: {
      default: null,
      type: Array
    },
    isRight: {
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
      navbar: (state) =>  state.navbar,
    }),
  },
  methods: {
    ...mapActions({
      updateLocale: 'updateLocale',
    }),
    changeLocale(loc) {
      // console.log('\n-C- NavbarItems > changeLocale > loc :', loc)
      // console.log('-C- NavbarItems > changeLocale > this.$route :', this.$route)
      this.updateLocale(loc)
    }
  }
}
</script>

<style scoped>

.navbar-multi-img {
  margin-top: .4em !important;
  max-height: 1.4em !important;
}

</style>

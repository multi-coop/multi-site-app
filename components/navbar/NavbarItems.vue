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
          class="is-size-7-touch"
          >
          <b-tooltip
            v-if="item.icon"
            :label="$translate('label', item)"
            position="is-left"
            type="is-dark">
            <b-icon
              :icon="item.icon"
              />
          </b-tooltip>
          <span v-else>
            {{ $translate('label', item) }}
          </span>
        </b-navbar-item>


        <!-- ITEMS - EXTERNAL LINK -->
        <b-navbar-item 
          v-if="item.component === 'extLink'"
          :href="item.link"
          target="_blank"
          tag="a"
          class="is-size-7-touch"
          >
          <b-tooltip
            v-if="item.icon"
            :label="$translate('label', item)"
            position="is-left"
            type="is-dark">
            <b-icon
              :icon="item.icon"
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
          class="is-size-7-touch"
          >
          <template #label>
            <b-icon
              v-if="item.icon"
              :icon="item.icon"
              class="mr-1"
              size="is-small"
              />
              <span>
                {{ $translate('label', item) }}
              </span>
          </template>

          <b-navbar-item 
            v-for="subItem in item.submenu"
            :key="subItem.name"
            :to="{ path: subItem.link }"
            tag="router-link"
            class="is-size-7-touch"
            :active="subItem.link === $route.path"
            >
            <span
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
  props: [
    'items',
    'isRight'
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
      console.log('-C- NavbarItems > changeLocale > loc :', loc)
      this.updateLocale(loc)
    }
  }
}
</script>

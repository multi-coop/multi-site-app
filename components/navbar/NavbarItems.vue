<template>
  
  <div style="display: flex">

    <div style="display: flex"
      v-for="item in items"
      :key="item.name"
      >

      <b-navbar-item 
        v-if="item.component === 'simpleLink'"
        tag="router-link"
        :to="{ path: item.link }"
        >
        {{ item.label[locale] }}
      </b-navbar-item>

      <b-navbar-dropdown 
        v-if="item.component === 'dropdownLink'"
        :label="item.label[locale]"
        :arrowless="item.options.includes('arrowless')"
        :hoverable="item.options.includes('hoverable')"
        >

        <b-navbar-item 
          v-for="subItem in item.submenu"
          :key="subItem.name"
          tag="router-link"
          :to="{ path: subItem.link }"
          >
          {{ subItem.label[locale] }}
        </b-navbar-item>

      </b-navbar-dropdown>

      <b-navbar-item 
        tag="div"
        v-if="item.component === 'switchLocaleDropdown'"
        >
        <b-button
          type="is-primary"
          :rounded="item.options.includes('rounded')"
          size="is-small"
          >
          <strong class="is-uppercase">
            {{ locale }}
          </strong>
        </b-button>
      </b-navbar-item>

    </div>

  </div>

</template>


<script>
import { mapState } from 'vuex' 

export default {
  name: 'NavbarItems',
  props: [
    'items'
  ],
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      navbar: (state) =>  state.navbar,
    }),
  },
}
</script>

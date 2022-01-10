<template>
  
  <div style="display: flex">

    <div style="display: flex"
      v-for="item in items"
      :key="item.name"
      >

      <div style="display: flex"
        v-if="!item.disabled"
        > 

        <b-navbar-item 
          v-if="item.component === 'simpleLink'"
          tag="router-link"
          :to="{ path: item.link }"
          >
          {{ $translate('label', item) }}
        </b-navbar-item>



        <b-navbar-dropdown 
          v-if="item.component === 'dropdownLink'"
          :label="$translate('label', item)"
          :arrowless="item.options.includes('arrowless')"
          :hoverable="item.options.includes('hoverable')"
          :right="isRight"
          >

          <b-navbar-item 
            v-for="subItem in item.submenu"
            :key="subItem.name"
            tag="router-link"
            :to="{ path: subItem.link }"
            >
            {{ $translate('label', subItem) }}
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

  </div>

</template>


<script>
import { mapState } from 'vuex' 

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
      navbar: (state) =>  state.navbar,
    }),
  },
}
</script>

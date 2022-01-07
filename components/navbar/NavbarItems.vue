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
        {{ item.name }}
      </b-navbar-item>

      <b-navbar-dropdown 
        v-if="item.component === 'dropdownLink'"
        hoverable
        :label="item.name"
        >

        <b-navbar-item 
          v-for="subItem in item.submenu"
          :key="subItem.name"
          tag="router-link"
          :to="{ path: subItem.link }"
          >
          {{ subItem.name }}
        </b-navbar-item>

      </b-navbar-dropdown>

      <b-navbar-item 
        tag="div"
        v-if="item.component === 'buttonLink'"
        >
        <div class="buttons">
          <a class="button is-primary">
            <strong>
              Sign up
            </strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>

      <b-navbar-item 
        tag="div"
        v-if="item.component === 'switchLocaleDropdown'"
        >
        <div class="buttons">
          <a class="button is-primary">
            <strong>
              {{ locale }}
            </strong>
          </a>
        </div>
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
      gitInfos: (state) =>  state.gitInfos,
    }),
  },
}
</script>

<template>
    
    <b-navbar
      class=""
      :fixed-top="navbar.data['fixed-top']"
      >

      <template #brand>
        <b-navbar-item 
          tag="router-link" 
          :to="{ path: '/' }"
          >
          <img
            :src="`${rawRoot}${navbar.data['logo-left']}`"
          >
        </b-navbar-item>
      
      </template>

      <template 
        v-if="navbar.data['buttons-left']"
        #start
        >

        <NavbarItems
          :items="navbar.data['buttons-left']"
        />

      </template>

      <template 
        v-if="navbar.data['buttons-right']"
        #end
        >
        
        <NavbarItems
          :items="navbar.data['buttons-right']"
        />

      </template>


    </b-navbar>

</template>

<script>

import { mapState, mapGetters } from 'vuex' 

export default {
  name: 'NavbarComponent',
  components: {
    NavbarItems: () => import(/* webpackChunkName: "NavbarItems" */ '~/components/navbar/NavbarItems.vue'),
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      navbar: (state) =>  state.navbar,
      gitInfos: (state) =>  state.gitInfos,
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
    }),
  },
}
</script>

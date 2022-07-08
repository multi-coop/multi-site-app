<template>

  <div 
    :class="`content ${sectionOptions['custom-classes']}`"
    >

    <!-- <code><pre>{{ sectionOptions.html }}</pre></code>
    <hr> -->

    <div 
      v-html="sectionOptions.html"
    />

    <div
      v-for="(js, idx) in sectionOptions.js"
      :key="`widget-script-${idx}`"
      >
      <script
        v-if="!js.script"
        :src="js.href"
        type='text/javascript'
        >
      </script>
      <script
        v-if="js.script"
        type='text/javascript'
        >
        {{ js.script }}
      </script>
    </div>

    <style
      v-if="sectionOptions.css"
      type='text/css'
      >
      {{ sectionOptions.css }}
    </style>

    <!-- EXTERNAL WIDGET : simulator shares -->
    <!-- <multi-shares-simulator 
      locale="fr"
      partvalue="25"
      minbenefs="0"
      benefs="100000"
      repart='{
        "reserves":0.4,
        "participation":0.5,
        "dividendes":0.1
      }'
      team='[
        { "name":"Johan Richer", "parts":100, "workTime":100 }, 
        { "name":"Julien Paris", "parts":100, "workTime":100 }, 
        { "name":"Thomas Brosset", "parts":40, "workTime":40 }, 
        { "name":"Pierre Camilleri", "parts":100, "workTime":60 }, 
        { "name":"Quentin Loridant", "parts": 100, "workTime":80 }
      ]'
    /> -->

  </div>

</template>


<script>
import { mapState } from 'vuex' 

export default {
  name: 'ButtonsComponent',
  props: [
    'sectionIndex',
    'sectionOptions',
    'debug'
  ],
  data () {
    return {
      // tagScript: undefined,
      // tagCss: undefined
    }
  },
  head () {
    return {
      script: [],
      style: []
    }
  },
  beforeMount () {
    
    // if (this.sectionOptions.js) {
    //   const widgetScript = {
    //     type: 'text/javascript', 
    //     src: this.sectionOptions.js,
    //     // src: 'https://multi-site-simulator-test.netlify.app/js/app.js', 
    //     async: true, 
    //     body: true
    //   }
    //   const tagScript = document.createElement("script")
    //   tagScript.setAttribute("src", widgetScript.src)
    //   tagScript.setAttribute("type", widgetScript.type)
    //   tagScript.setAttribute("async", widgetScript.async)
    //   tagScript.setAttribute("body", widgetScript.body)
    //   document.head.appendChild(tagScript)
    //   // this.tagScript = document.head.appendChild(tagScript)
    // }

    // if (this.sectionOptions.css) {
    //   const widgetCss = {
    //     type: 'text/css', 
    //     href: this.sectionOptions.css,
    //     // href: 'https://multi-site-simulator-test.netlify.app/css/app.css'
    //   }
    //   const tagCss = document.createElement("style")
    //   tagCss.setAttribute("type", widgetCss.type)
    //   tagCss.setAttribute("href", widgetCss.href)
    //   document.head.appendChild(tagCss)
    //   // this.tagCss = document.head.appendChild(tagCss)
    // }

  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
  // beforeDestroy () {
  //   document.head.removeChild(this.tagScript)
  //   document.head.removeChild(this.tagCss)
  // }
}
</script>

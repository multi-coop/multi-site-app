<template>

  <div 
    :class="`content ${sectionOptions['custom-classes']}`"
    >

    <!-- <code><pre>{{ sectionOptions.html }}</pre></code>
    <hr> -->

    <div
      v-for="(js, idx) in sectionOptions.js"
      :key="`widget-script-${idx}`"
      >
      <script
        v-if="!js.script"
        :src="js.href"
        type='text/javascript'
        async="true"
        >
      </script>
      <script
        v-if="js.script"
        type='text/javascript'
        async="true"
        >
        {{ js.script }}
      </script>
    </div>

    <div 
      v-html="sectionOptions.html"
    />

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

    <!-- <script src='https://www.welcomekit.co/assets/embed.js' type='text/javascript'></script>
    <script type='text/javascript'>
      welcomeKitReady(function() {
        var wk = new WelcomeKitEmbed('J78KpaG')
        wk.group('job')
        wk.display(["department","officeCity","contractType"])
        wk.locale('fr')
        wk.website('multi')
        wk.render()
      })
    </script>
    <div id='welcomekit-embed'></div> -->
    <style>
      .welcomekit-jobs-list-item {
        margin: 0;
        padding: 0;
      }
      .welcomekit-jobs-list-item-link {
        position: relative;
        display: block;
        margin: 0;
        padding: 30px 5px;
        border-bottom: 1px solid #eee;
        text-decoration: none;
        transition: all 0.2s;
      }
      .welcomekit-jobs-list-item-link:after {
        position: absolute;
        top: 50%;
        right: 30px;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        content: ' ';
        border-top: 1px solid #ddd;
        border-right: 1px solid #ddd;
        transform: rotate(45deg);
        transition: all 0.2s;
      }
      .welcomekit-jobs-list-item-link:hover {
        background: #f5f5f5;
        border-bottom-color: #ddd;
      }
      .welcomekit-jobs-list-item-link:hover:after {
        right: 20px;
        border-top-color: #aaa;
        border-right-color: #aaa;
      }
      .welcomekit-job-name {
        margin: 0 0 10px 0;
        padding: 0;
        font-weight: 500;
        font-size: 19px;
        line-height: 20px;
      }
      .welcomekit-job-infos {
        margin: 0;
        padding: 0;
      }
      .welcomekit-job-infos > li {
        position: relative;
        display: inline-block;
        margin: 0 34px 0 0;
        color: #aaa;
      }
      .welcomekit-job-infos > li:before {
        position: absolute;
        top: 6px;
        left: -20px;
        content: ' ';
        display: block;
        height: 6px;
        width: 6px;
        background: #ddd;
        border-radius: 50%;
      }
      .welcomekit-job-infos > li:first-child:before {
        display: none;
      }
      .welcomekit-job-infos > li.welcomekit-job-description {
        display: block;
        margin: 10px 0 0 0;
        padding: 10px 20px;
        border-left: 2px solid #eee;
      }
      .welcomekit-job-infos > li.welcomekit-job-description p,
      .welcomekit-job-infos > li.welcomekit-job-description ul {
        margin: 0;
        padding: 0 0 10px 0;
        color: #bbb;
      }
      .welcomekit-job-infos > li.welcomekit-job-description ul li {
        border-left: 1px solid #eee;
        padding-left: 10px;
        margin-bottom: 10px;
      }
      .welcomekit-job-infos > li.welcomekit-job-description pre {
        border-left: 1px solid #eee;
        padding-left: 10px;
        overflow: auto;
      }
      .welcomekit-job-infos > li.welcomekit-job-description:before {
        display: none
      }
      .welcomekit-office-city,
      .welcomekit-department-name {
        display: block;
        padding: 15px;
        background: #eee;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        font-weight: 500;
        font-size: 17px;
        line-height: 18px;
        text-transform: uppercase;
      }
      .welcomekit-warning {
        display: block;
        padding: 50px 0;
        text-align: center;
      }
    </style>

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

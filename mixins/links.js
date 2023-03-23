import { mapState, mapGetters } from 'vuex' 

export default ({
  computed: {
    ...mapState({
      gitInfos: (state) =>  state.gitInfos
    }),
    ...mapGetters({
      rawRoot : 'getGitRawRoot',
      publicRoot: 'getGitPublicRoot'
    }),
  },
  methods: {
    convertUrl(url) {
      return `${this.rawRoot}${url}`
    },
    convertUrlPublic(url) {
      return `${this.publicRoot}${url}`
    },
    convertUrlImage (url) {
      let rawRoot = this.rawRoot
      let urlClean = url
      if (this.gitInfos.gitProvider === 'localhost' && urlClean.startsWith('./')) {
        rawRoot = rawRoot.replace('/content', '/statics')
        urlClean = urlClean.replace('./', '')
      }
      const srcLink = url && url.startsWith('./') ? `${rawRoot}${urlClean}` : urlClean
      return srcLink
    }
  }
})

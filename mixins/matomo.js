import { mapState } from 'vuex' 

export default ({
  computed: {
    ...mapState({
      isMatomo: (state) => state.isMatomo,
      matomoServer: (state) => state.matomoServer,
      matomoSiteId: (state) => state.matomoSiteId,
      matomoTrackOutlinks: (state) => state.isMatomo,
    }),
  },
  methods: {
    trackEvent (value, action, category) {
      console.log('\n-MX- matomo > trackEv > category :', category)
      console.log('-MX- matomo > trackEv > action :', action)
      console.log('-MX- matomo > trackEv > value :', value)
      console.log('-MX- matomo > trackEv > this.isMatomo :', this.isMatomo)
      if (this.isMatomo) {
        const _paq = window._paq
        _paq.push(['trackEvent', category, action, value])
      }
    },
    trackLink (link) {
      if (this.isMatomo && this.matomoTrackOutlinks) {
        console.log('-MX- matomo > trackOutlink > link :', link)
        const _paq = window._paq
        // console.log('M > trackEvent > _paq : ', _paq)
        _paq.push(['trackLink', link])
      }
    }
  }
})

export default ({
  methods: {
    buildTo (item) {
      const queryObj = {
        locale: this.locale
      }
      if (item.scrollTo) { queryObj.scrollto = item.scrollTo }
      const toObj = {
        path: item.link,
        hash: item.hash,
        query: queryObj
      }
      return toObj
    }
  }
})
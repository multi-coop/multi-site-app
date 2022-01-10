
export default ({store}, inject) => {
  const translate = (key, dict) => {
    return dict[key][store.state.locale] || dict[key][store.state.localeFallback] || key
  }
  // Inject $translate(key, dict, locale) in Vue, context and store.
  inject('translate', translate)
}

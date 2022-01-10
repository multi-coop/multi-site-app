
export default ({store}, inject) => {
  const translate = (key, dict) => {
    return dict && dict[key] && dict[key][store.state.locale] || dict && dict[key] && dict[key][store.state.localeFallback] || key
  }
  // Inject $translate(key, dict, locale) in Vue, context and store.
  inject('translate', translate)
}

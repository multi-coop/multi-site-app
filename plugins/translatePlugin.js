
export default (context, inject) => {
  const translate = (key, dict, locale) => {
    return dict[key][locale]
  }
  // Inject $translate(key, dict, locale) in Vue, context and store.
  inject('translate', translate)
}

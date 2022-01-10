import axios from 'axios'

export default (context, inject) => {
  const axiosRequest = axios
  // Inject $axios(msg) in Vue, context and store.
  inject('axios', axiosRequest)
}

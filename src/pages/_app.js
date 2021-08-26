import '../assets/styles/globals.css'
import { wrapper } from '../store'
import '../assets/styles/scss/styles.scss'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

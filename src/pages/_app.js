import '../assets/styles/globals.css'
import { wrapper } from '../store'
import '../assets/styles/scss/styles.scss'
import PropTypes from 'prop-types'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};



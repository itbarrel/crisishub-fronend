import '../assets/styles/globals.css'
import { wrapper } from '../store'
import '../assets/styles/scss/styles.scss'
import PropTypes from 'prop-types'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

function MyApp({ Component, pageProps }) {
  return (
    <LocaleProvider locale={enUS}>
      <Component {...pageProps} />
    </LocaleProvider>
  )
}

export default wrapper.withRedux(MyApp)
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};



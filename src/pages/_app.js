import '../assets/styles/globals.css'
import { wrapper } from '../store'
import '../assets/styles/scss/styles.scss'
import PropTypes from 'prop-types'
import { ConfigProvider  } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider  locale={enUS}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default wrapper.withRedux(MyApp)
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};



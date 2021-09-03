import { wrapper } from "../store";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
// import "../../public/vendors/style";
import "../assets/styles/style.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

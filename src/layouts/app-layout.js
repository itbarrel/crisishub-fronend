/* eslint-disable indent */
import React from "react";
import { ConfigProvider, Layout } from "antd";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import AppLocale from "../lngProvider";
import Sidebar from "./Sidebar";
import HorizontalDefault from "./Topbar/HorizontalDefault";
import HorizontalDark from "./Topbar/HorizontalDark";
import InsideHeader from "./Topbar/InsideHeader";
import AboveHeader from "./Topbar/AboveHeader";
import BelowHeader from "./Topbar/BelowHeader";
import Topbar from "./Topbar";

import { FOOTER_TEXT } from "../constants/messages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_DARK,
} from "../constants/ThemeSetting";

import NoHeaderNotification from "./Topbar/NoHeaderNotification";
import Customizer from "./Customizer";
import { withAuthSync } from "../components/hoc/authGuard";

const { Content, Footer } = Layout;

// eslint-disable-next-line react/display-name
const withLayout = (Page) => (props) => {
  const { width, themeType, locale, navStyle } = useSelector(
    ({ ui }) => ui.settings
  );

  const getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };

  const getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return <HorizontalDefault />;
      case NAV_STYLE_DARK_HORIZONTAL:
        return <HorizontalDark />;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return <InsideHeader />;
      case NAV_STYLE_ABOVE_HEADER:
        return <AboveHeader />;
      case NAV_STYLE_BELOW_HEADER:
        return <BelowHeader />;
      case NAV_STYLE_FIXED:
        return <Topbar />;
      case NAV_STYLE_DRAWER:
        return <Topbar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification />;
      default:
        return null;
    }
  };

  const getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar />;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED:
        return <Sidebar />;
      case NAV_STYLE_DRAWER:
        return <Sidebar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar />;
      default:
        return null;
    }
  };

  let bodyClass = "";
  if (themeType === THEME_TYPE_DARK) {
    bodyClass = "dark-theme";
  }

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <>
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Layout className={`gx-app-layout ${bodyClass}`}>
            {getSidebar(navStyle, width)}
            <Layout>
              {getNavStyles(navStyle)}
              <Content
                className={`gx-layout-content ${getContainerClass(navStyle)}`}
              >
                <div className="gx-main-content-wrapper">
                  <Page {...props} />
                </div>
                <Footer>
                  <div className="gx-layout-footer-content">{FOOTER_TEXT}</div>
                </Footer>
              </Content>
            </Layout>
            <Customizer />
          </Layout>
        </IntlProvider>
      </ConfigProvider>
    </>
  );
};

withLayout.displayName = "someName";

export default (Page) => withAuthSync(withLayout(Page));

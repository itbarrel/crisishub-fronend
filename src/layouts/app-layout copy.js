import React from 'react'
import { ConfigProvider, Layout } from "antd";
import { IntlProvider } from 'react-intl';
import { connect, useSelector, useDispatch } from "react-redux";

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
  THEME_TYPE_DARK
} from "../constants/ThemeSetting";

import NoHeaderNotification from "./Topbar/NoHeaderNotification";

// Old Imports
import { withAuthSync } from '../components/hoc/authGuard'
import { getDisplayName } from '../utils'
import { onLogOut } from "../store/slices/auth";
import Header from '../components/header'

const LegalFooter = () => {
  // const { t } = useTranslation('footer')
  return (
    <div className='flex text-white bg-argo-primary-1 p-4 justify-end'>
      {/* <Link href='/legal-disclaimer'>
        <a className='hover:text-argo-primary-2 mx-4'>{t('legal')}</a>
      </Link>
      <Link href='/terms-of-service'>
        <a className='hover:text-argo-primary-2 mx-4'>{t('terms')}</a>
      </Link>
      <Link href='/privacy-policy'>
        <a className='hover:text-argo-primary-2 mx-4'>{t('privacy')}</a>
      </Link> */}
    </div>
  )
}

const withLayout = (Page) => {

  const handleLogout = () => {
    const { token, dispatch } = this.props
    console.log('0000000000')
    dispatch(onLogOut())
  }

  return (
    <div className='flex items-stretch h-full'>
      {/*<Navigation permissions={permissions} />*/}
      <div className='flex flex-grow flex-col'>
        <div className='overflow-y-scroll h-full flex flex-col'>
          <div className='p-4 xl:p-8 bg-argo-primary-4 flex-grow'>
            <Page {...props} />
          </div>
          <LegalFooter />
        </div>
      </div>
    </div>
  )
}

export default (Page) => withAuthSync(withLayout(Page))

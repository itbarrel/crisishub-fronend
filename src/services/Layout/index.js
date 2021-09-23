import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { withAuthSync } from '../../components/hoc/authGuard'
import { getDisplayName } from '../Utils'

import { logout } from '../../store/session'

import Link from 'next/link'
import { useTranslation } from '../../modules/I18n'

const LegalFooter = () => {
  const { t } = useTranslation('footer')
  return (
    <div className='flex text-white bg-argo-primary-1 p-4 justify-end'>
      <Link href='/legal-disclaimer'>
        <a className='hover:text-argo-primary-2 mx-4'>{t('legal')}</a>
      </Link>
      <Link href='/terms-of-service'>
        <a className='hover:text-argo-primary-2 mx-4'>{t('terms')}</a>
      </Link>
      <Link href='/privacy-policy'>
        <a className='hover:text-argo-primary-2 mx-4'>{t('privacy')}</a>
      </Link>
    </div>
  )
}

const withLayout = (Page) => {
  return class extends React.Component {
    static displayName = `withLayout(${getDisplayName(Page)})`

    static async getInitialProps(ctx) {
      const pageProps = Page.getInitialProps && (await Page.getInitialProps(ctx))
      return pageProps
    }

    componentDidMount() {
      const { token, dispatch } = this.props
      // dispatch(getCurrentClient(token))
    }

    handleLogout() {
      const { token, dispatch } = this.props
      dispatch(logout(token))
    }

    render() {
      // const { permissions } = this.props.client
      return (
        <>
          <Page {...this.props} />
        </>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth
  return {
    user
  }
}

export default (Page) => connect(mapStateToProps)(withAuthSync(withLayout(Page)))

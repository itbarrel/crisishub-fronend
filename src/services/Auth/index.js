import React from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import Cookie from 'js-cookie'

import { getDisplayName } from '../Utils'

const serverRedirect = ({ res, location }) => {
  res.writeHead(302, { location: location || '/' })
  res.end()
}

const clientRedirect = ({ location }) => {
  Router.push(location || '/')
}

const auth = (ctx) => {
  const { token } = nextCookie(ctx)
  if (ctx.req && !token) {
    serverRedirect(ctx)
    return
  }

  if (!token) {
    clientRedirect()
  }

  return token
}

export const login = (token, role) => {
  Cookie.set('token', token, { expires: 1 })
  Router.push(role === 'customer' ? '/' : '/dashboard')
}

export const logout = () => {
  Cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

export const withAuthSync = (Page) => {
  return class extends React.Component {
    static displayName = `withAuthSync(${getDisplayName(Page)})`

    static async getInitialProps(ctx) {
      const token = auth(ctx)
      const componentProps = Page.getInitialProps && (await Page.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    constructor(props) {
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout(event) {
      if (event.key === 'logout') { Router.push('/') }
    }

    render() {
      return <Page {...this.props} />
    }
  }
}

import Router from 'next/router'
import Cookie from 'js-cookie'

export const login = (token) => {
  Cookie.set('token', token, { expires: 100 })
  Router.push('/secure/dashboard')
}

export const logout = () => {
  Cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/auth/login')
}

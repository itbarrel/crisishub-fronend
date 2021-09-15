import Router from 'next/router'
import { CookieService } from "../../services/storage.service";

export const login = (token) => {
  CookieService.saveToken(token, { expires: 100 })
  Router.push('/secure/dashboard')
}

export const logout = () => {
  CookieService.removeToken()
  window.localStorage.setItem('logout', Date.now())
  Router.push('/auth/login')
}

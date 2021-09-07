import fetch from 'unfetch'
import withQuery from 'with-query'
import Router from 'next/router'

import { logout } from '../Auth'

const checkStatus = (response) => {
  if (response.ok) {
    return response
  } else {
    const error = new Error(response.status)
    error.response = response
    return Promise.reject(error)
  }
}

const handleNotAuthorized = (error) => {
  if (error.response.status === 401) logout()
  return Promise.reject(error)
}

const handleForbidden = (error) => {
  if (error.response.status === 403) Router.push('/dashboard')
  return Promise.reject(error)
}

const handleBadData = (error) => {
  if (error.response.status === 400) return Promise.reject(error)
}

export default class ApiClient {
  constructor (apiUrl) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    this.config = config
    this.apiUrl = apiUrl
  }

  get (path, data, token) {
    const url = withQuery(this.apiUrl + path, data)
    const config = { ...this.config, method: 'GET' }
    return this.makeRequest(url, config, token)
  }

  post (path, data, token) {
    const url = this.apiUrl + path
    const json = JSON.stringify(data)
    const config = { ...this.config, method: 'POST', body: json }
    return this.makeRequest(url, config, token)
  }

  delete (path, data, token) {
    const url = this.apiUrl + path
    const json = JSON.stringify(data)
    const config = { ...this.config, method: 'DELETE', body: json }
    return this.makeRequest(url, config, token)
  }

  patch (path, data, token) {
    const url = this.apiUrl + path
    const json = JSON.stringify(data)
    const config = { ...this.config, method: 'PATCH', body: json }
    return this.makeRequest(url, config, token)
  }

  put (path, data, token) {
    const url = this.apiUrl + path
    const json = JSON.stringify(data)
    const config = { ...this.config, method: 'PUT', body: json }
    return this.makeRequest(url, config, token)
  }

  postFormData (path, data, token) {
    const url = this.apiUrl + path
    const config = { method: 'POST', body: data }
    return this.makeRequest(url, config, token)
  }

  makeRequest (url, config, token) {
    if (!token) {
      return fetch(url, config)
        .then(checkStatus)
        .catch(handleNotAuthorized)
    } else {
      const { headers } = config
      return fetch(url, { ...config, headers: { ...headers, 'Client-Token': token } })
        .then(checkStatus)
        .catch(handleNotAuthorized)
        .catch(handleForbidden)
        .catch(handleBadData)
    }
  }
}

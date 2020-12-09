import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


// 操作cookie
export function getCookie(name) {
  return Cookies.get(name)
}

export function setCookie(name, val) {
  return Cookies.set(name, val)
}

export function removeCookie(name) {
  return Cookies.remove(name)
}

// 操作 LocalStorage
export function getLocalStorage(name) {
  return localStorage.getItem(name)
}

export function setLocalStorage(name, val, date) {
  return localStorage.setItem(name, val, date)
}

export function removeLocalStorage(name, val) {
  return localStorage.removeItem(name, val)
}

// 操作 Session Storage
export function getSessionStorage(name) {
  return sessionStorage.getItem(name)
}

export function setSessionStorage(name, val, date) {
  return sessionStorage.setItem(name, val, date)
}

export function removeSessionStorage(name) {
  return sessionStorage.removeItem(name)
}

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getLogin() {
  return Cookies.get("isLogin")
}

export function getId() {
  return Cookies.get("id")
}

export function getUsername() {
  return Cookies.get("username")
}

export function getRealname() {
  return Cookies.get("realname")
}

export function getPhone() {
  return Cookies.get("phone")
}

export function getRole() {
  return Cookies.get("role")
}

export function setLogin(data) {
  Cookies.set("username", data.user.username)
  Cookies.set("realname", data.user.realname)
  Cookies.set("phone", data.user.phone)
  Cookies.set("id", data.id)
  Cookies.set("role", data.user.roles)
  Cookies.set("isLogin", 1)
  return
}

export function removeLogin() {
  Cookies.remove("isLogin")
  Cookies.remove("id")
  return
}

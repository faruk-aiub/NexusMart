export function saveToken(token) {
  localStorage.setItem('nexusmart_token', token)
}

export function getToken() {
  return localStorage.getItem('nexusmart_token')
}

export function removeToken() {
  localStorage.removeItem('nexusmart_token')
}

export function saveUser(user) {
  localStorage.setItem('nexusmart_user', JSON.stringify(user))
}

export function getUser() {
  const user = localStorage.getItem('nexusmart_user')

  if (user) {
    return JSON.parse(user)
  }

  return null
}

export function removeUser() {
  localStorage.removeItem('nexusmart_user')
}
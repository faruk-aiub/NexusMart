export function saveToken(token) {
  localStorage.setItem('nexusmart_token', token)
}

export function getToken() {
  return localStorage.getItem('nexusmart_token')
}

export function removeToken() {
  localStorage.removeItem('nexusmart_token')
}
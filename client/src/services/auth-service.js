import apiClient, { setToken } from './api-client'
import { jwtDecode } from 'jwt-decode'

const getEndpoint = slug => '/users' + slug

const tokenKey = 'token'

const login = async user => {
  const endpoint = getEndpoint('/signin')

  const response = await apiClient.post(endpoint, user)

  const token = response.headers['x-auth-token']

  localStorage.setItem('token', token)

  setToken(token)

  return jwtDecode(token)
}

const register = async user => {
  const endpoint = getEndpoint('/signup')

  const response = await apiClient.post(endpoint, user)

  const token = response.headers['x-auth-token']

  localStorage.setItem('token', token)

  setToken(token)

  return jwtDecode(token)
}

const logout = () => {
  localStorage.removeItem(tokenKey)
  setToken(null)
}

const getCurrentUser = () => {
  try {
    const token = localStorage.getItem(tokenKey)

    if (!token) return null

    setToken(token)

    return jwtDecode(token)
  } catch (error) {
    localStorage.removeItem(tokenKey)
  }
}

export { login, register, logout, getCurrentUser }

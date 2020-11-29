import axios from 'axios'
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes'

export function auth(email, password, isLogin) {
  return async (dispath) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBJklVpF1ETTMTVqkK6xA2_eZzYJpGr9w'

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBJklVpF1ETTMTVqkK6xA2_eZzYJpGr9w'
    }
    const response = await axios.post(url, authData)
    const data = response.data

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    )

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispath(authSuccess(data.idToken))
    dispath(autoLogout(data.expiresIn))
  }
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT,
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  }
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        )
      }
    }
  }
}

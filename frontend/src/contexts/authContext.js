/* eslint-disable camelcase */
import { createContext, useEffect, useReducer } from 'react'
import { authAPI } from './../services/auth.service'

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    }
  },
  LOGIN: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user
    }
  }
}

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state)

export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
})

export const AuthProvider = (props) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken) {
          const user = await authAPI.me(accessToken)
          console.log('DISPATCH', user)
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          })
        } else {
          console.log('DISPATCH NOT TOKEN')
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    }
    initialize()
  }, [])

  const login = async (correo_electronico, password) => {
    const accessToken = await authAPI.login({ correo_electronico, password })
    console.log('TOKEN_LOGIN', accessToken)

    if (accessToken === null) {
      return
    }

    const user = await authAPI.me(accessToken)

    if (user === null) {
      return
    }

    localStorage.setItem('accessToken', accessToken)

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    })
  }

  const logout = async () => {
    localStorage.removeItem('accessToken')
    dispatch({ type: 'LOGOUT' })
  }

  const values = {
    ...state,
    login,
    logout
  }

  return (
    <AuthContext.Provider
      value={values}
    >
      {children}
    </AuthContext.Provider>
  )
}

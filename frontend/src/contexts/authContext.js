/* eslint-disable camelcase */
import { createContext, useEffect, useReducer } from 'react'
import { auth } from './../services/auth.service'

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
          const user = await auth.me(accessToken)

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          })
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
        }
      } catch (err) {
        console.error(err)
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
    console.log('object')
    const accessToken = await auth.login({ correo_electronico, password })

    const user = await auth.me(accessToken)

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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

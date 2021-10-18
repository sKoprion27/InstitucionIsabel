import Axios from 'axios'
const URL_BASE = 'http://localhost:4000'
export const authAPI = {
  login: async (correo_electronico, password) => {
    const { data } = await Axios.post(`${URL_BASE}/auth/login/`, {
      correo_electronico,
      password
    })
    return data.response
  },
  me: async (token) => {
    const { data } = await Axios.post(`${URL_BASE}/auth/me/`, token, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return data.response
  },
  initInterceptors: () => {
    Axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem('TOKEN_ISABEL')

      if (token) {
        config.headers.Authorization = `bearer ${token}`
      }

      return config
    })

    Axios.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem('TOKEN_ISABEL')
          window.location = '/login'
        } else {
          return Promise.reject(error)
        }
      }
    )
  }
}

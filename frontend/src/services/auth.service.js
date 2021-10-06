import axios from 'axios'
const URL_BASE = 'http://localhost:4000'
export const authAPI = {
  login: async (credentials = {}) => {
    try {
      const response = await axios.post(`${URL_BASE}/auth/login/`, credentials)
      const { data } = response
      const token = data.resp
      return token
    } catch (error) {
      console.log(error)
    }
  },
  me: async (token) => {
    try {
      const response = await axios.post(`${URL_BASE}/auth/me/`, token, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const user = response.data.resp
      if (user) {
        return user
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }
}

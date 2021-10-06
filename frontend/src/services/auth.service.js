import axios from 'axios'
const URL_BASE = 'http://localhost:4000'
export const auth = {
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
      const user = await axios.get(`${URL_BASE}/auth/me/`, token)
      return user
    } catch (error) {
      console.log(error)
    }
  }
}

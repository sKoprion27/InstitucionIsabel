import axios from 'axios'
const URL_BASE = 'http://localhost:4000'
export const authAPI = {
  login: async ({ correo_electronico = '', password = '' }) => {
    // console.log('SERVICE LOGIN ', { correo_electronico, password })
    try {
      const resAxios = await axios.post(`${URL_BASE}/auth/login/`, {
        correo_electronico,
        password
      })
      const { data: { resp } } = resAxios
      const token = resp
      return token
    } catch (error) {
      return null
    }
  },
  me: async (token) => {
    // console.log('TOKEN ME', token)
    try {
      const resAxios = await axios.post(`${URL_BASE}/auth/me/`, token, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const { resp } = resAxios.data
      const user = resp
      return user
    } catch (error) {
      return null
    }
  }
}

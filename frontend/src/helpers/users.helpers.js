import Axios from 'axios'
const URL_API = 'http://localhost:4000'
export const getAllUsers = async () => {
  const { data } = await Axios.get(`${URL_API}/users`)
  return data.response
}

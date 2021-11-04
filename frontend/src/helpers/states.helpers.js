import Axios from 'axios'
const URL_API = 'http://localhost:4000'
export const getAllStates = async () => {
  const { data } = await Axios.get(`${URL_API}/states`)
  return data.response
}

export const getOneState = async (id) => {
  const { data } = await Axios.get(`${URL_API}/states/${id}`)
  return data.response
}

export const updateState = async (donor, id) => {
  const { data } = await Axios.put(`${URL_API}/states/${id}`)
  return data.response
}

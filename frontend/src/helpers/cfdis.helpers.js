import Axios from 'axios'
const URL_API = 'http://localhost:4000'
export const getAllCfdis = async () => {
  const { data } = await Axios.get(`${URL_API}/cfdis`)
  return data.response
}

export const getOneCfdi = async (id) => {
  const { data } = await Axios.get(`${URL_API}/cfdis/${id}`)
  return data.response
}

export const updateCfdi = async (donor, id) => {
  const { data } = await Axios.put(`${URL_API}/cfdis/${id}`)
  return data.response
}

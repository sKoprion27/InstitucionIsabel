import Axios from 'axios'
export const getAllCfdis = async () => {
  const { data } = await Axios.get('/cfdis')
  return data.response
}

export const getOneCfdi = async (id) => {
  const { data } = await Axios.get(`/cfdis/${id}`)
  return data.response
}

export const updateCfdi = async (donor, id) => {
  const { data } = await Axios.put(`/cfdis/${id}`)
  return data.response
}

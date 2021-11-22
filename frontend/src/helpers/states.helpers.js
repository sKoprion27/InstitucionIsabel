import Axios from 'axios'
export const getAllStates = async () => {
  const { data } = await Axios.get('/states')
  return data.response
}

export const getOneState = async (id) => {
  const { data } = await Axios.get(`/states/${id}`)
  return data.response
}

export const updateState = async (donor, id) => {
  const { data } = await Axios.put(`/states/${id}`)
  return data.response
}

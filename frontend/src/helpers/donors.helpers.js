import Axios from 'axios'
const URL_API = 'http://localhost:4000'
export const getAllDonors = async () => {
  const { data } = await Axios.get(`${URL_API}/donors`)
  return data.response
}

export const getOneDonor = async (id) => {
  const { data } = await Axios.get(`${URL_API}/donors/${id}`)
  return data.response
}

export const updateDonor = async (donor, id) => {
  const { data } = await Axios.put(`${URL_API}/donors/${id}`, donor)
  return data.response
}

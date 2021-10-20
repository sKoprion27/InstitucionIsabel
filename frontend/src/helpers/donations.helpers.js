import Axios from 'axios'
const URL_API = 'http://localhost:4000'
export const getAllDonations = async () => {
  const { data } = await Axios.get(`${URL_API}/donations`)
  return data.response
}

export const getOneDonation = async (id) => {
  const { data } = await Axios.get(`${URL_API}/donations/${id}`)
  return data.response
}

export const updateDonation = async (donor, id) => {
  const { data } = await Axios.put(`${URL_API}/donations/${id}`)
  return data.response
}

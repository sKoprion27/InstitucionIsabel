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

export const postDonation = async (donation) => {
  const { data } = await Axios.post(`${URL_API}/donations`, donation)
  return data.response
}
export const updateDonation = async (donation, id) => {
  const { data } = await Axios.put(`${URL_API}/donations/${id}`, donation)
  return data.response
}

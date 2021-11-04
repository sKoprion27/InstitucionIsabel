import Axios from 'axios'
const URL_API = 'http://localhost:4000'

export const getAllTypesDonations = async () => {
  const { data } = await Axios.get(`${URL_API}/types-donations`)
  return data.response
}

export const getOneTypeDonation = async (id) => {
  const { data } = await Axios.get(`${URL_API}/types-donations/${id}`)
  return data.response
}
export const postTypeDonation = async (typeDonation) => {
  const { data } = await Axios.post(`${URL_API}/types-donations`, typeDonation)
  return data.response
}

export const updateTypeDonation = async (typeDonation, id) => {
  const { data } = await Axios
    .put(
      `${URL_API}/types-donations/${id}`,
      typeDonation
    )
  return data.response
}

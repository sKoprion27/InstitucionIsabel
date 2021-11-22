import Axios from 'axios'

export const getAllTypesDonations = async () => {
  const { data } = await Axios.get('/types-donations')
  return data.response
}

export const getOneTypeDonation = async (id) => {
  const { data } = await Axios.get(`/types-donations/${id}`)
  return data.response
}
export const postTypeDonation = async (typeDonation) => {
  const { data } = await Axios.post('/types-donations', typeDonation)
  return data.response
}

export const updateTypeDonation = async (typeDonation, id) => {
  const { data } = await Axios
    .put(
      `/types-donations/${id}`,
      typeDonation
    )
  return data.response
}

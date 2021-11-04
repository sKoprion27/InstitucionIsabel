import Axios from 'axios'
const URL_API = 'http://localhost:4000'

export const getAllPayments = async () => {
  const { data } = await Axios.get(`${URL_API}/payment-methods`)
  return data.response
}

export const getOnePayment = async (id) => {
  const { data } = await Axios.get(`${URL_API}/payment-methods/${id}`)
  return data.response
}

export const updateOnePayment = async (payment, id) => {
  const { data } = await Axios.put(`${URL_API}/payment-methods/${id}`, payment)
  return data.response
}

import Axios from 'axios'

export const getAllPayments = async () => {
  const { data } = await Axios.get('/payment-methods')
  return data.response
}

export const getOnePayment = async (id) => {
  const { data } = await Axios.get(`/payment-methods/${id}`)
  return data.response
}

export const postOnePayment = async (payment) => {
  const { data } = await Axios.post('/payment-methods', payment)
  return data.response
}

export const updateOnePayment = async (payment, id) => {
  const { data } = await Axios.put(`/payment-methods/${id}`, payment)
  return data.response
}

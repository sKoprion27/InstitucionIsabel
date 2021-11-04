import Axios from 'axios'
const URL_API = 'http://localhost:4000'
export const getAllBeneficiaries = async () => {
  const { data } = await Axios.get(`${URL_API}/beneficiaries`)
  return data.response
}

export const getOneBeneficiary = async (id) => {
  const { data } = await Axios.get(`${URL_API}/beneficiaries/${id}`)
  return data.response
}

export const postBeneficiary = async (beneficiary) => {
  const { data } = await Axios.put(`${URL_API}/beneficiaries`, beneficiary)
  return data.response
}

export const updateBeneficiary = async (beneficiary, id) => {
  const { data } = await Axios.put(`${URL_API}/beneficiaries/${id}`, beneficiary)
  return data.response
}

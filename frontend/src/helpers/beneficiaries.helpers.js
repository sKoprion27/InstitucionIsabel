import Axios from 'axios'
const fileDownload = require('js-file-download')
const URL_API = 'http://localhost:4000'
export const getAllBeneficiaries = async () => {
  const { data } = await Axios.get(`${URL_API}/beneficiaries`)
  return data.response
}

export const getOneBeneficiary = async (id) => {
  const { data } = await Axios.get(`${URL_API}/beneficiaries/${id}`)
  return data.response
}

export const postBeneficiary = async ({ beneficiary, archivo }) => {
  const form = new FormData()
  form.append('archivo', archivo)
  form.append('beneficiary', JSON.stringify(beneficiary))
  const { data } = await Axios.post(`${URL_API}/beneficiaries`, form, {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.response
}

export const getFileBeneficiary = async (id, file) => {
  const { data } = await Axios.get(`${URL_API}/beneficiaries/${id}/files`, {
    responseType: 'blob'
  })
  await fileDownload(data, file)
}

export const updateBeneficiary = async (post, id) => {
  const form = new FormData()
  form.append('archivo', post.archivo)
  form.append('beneficiary', JSON.stringify(post.beneficiary))
  const { data } = await Axios.put(`${URL_API}/beneficiaries/${id}`, form, {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.response
}

import Axios from 'axios'
const fileDownload = require('js-file-download')
export const getAllBeneficiaries = async () => {
  const { data } = await Axios.get('/beneficiaries')
  return data.response
}

export const getOneBeneficiary = async (id) => {
  const { data } = await Axios.get(`/beneficiaries/${id}`)
  return data.response
}

export const postBeneficiary = async ({ beneficiary, archivo }) => {
  const form = new FormData()
  form.append('archivo', archivo)
  form.append('beneficiary', JSON.stringify(beneficiary))
  const { data } = await Axios.post('/beneficiaries', form, {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.response
}

export const getFileBeneficiary = async (id, file) => {
  const { data } = await Axios.get(`/beneficiaries/${id}/files`, {
    responseType: 'blob'
  })
  await fileDownload(data, file)
}

export const updateBeneficiary = async (post, id) => {
  const form = new FormData()
  form.append('archivo', post.archivo)
  form.append('beneficiary', JSON.stringify(post.beneficiary))
  const { data } = await Axios.put(`/beneficiaries/${id}`, form, {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.response
}

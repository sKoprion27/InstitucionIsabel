import Axios from 'axios'
export const getAllDonors = async () => {
  const { data } = await Axios.get('/donors')
  return data.response
}

export const getAllDonorsPagination = async ({ limit, offset }) => {
  const { data } = await Axios.get(
    `/donors?limit=${limit}&offset=${offset}`
  )
  return data.response
}

export const getOneDonor = async (id) => {
  const { data } = await Axios.get(`/donors/${id}`)
  return data.response
}

export const updateDonor = async (donor, id) => {
  const { data } = await Axios.put(`/donors/${id}`, donor)
  return data.response
}

export const postDonor = async (donor) => {
  const { data } = await Axios.post('/donors/', donor)
  return data.response
}

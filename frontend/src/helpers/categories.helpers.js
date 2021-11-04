import Axios from 'axios'
const URL_API = 'http://localhost:4000'

export const getAllCategories = async () => {
  const { data } = await Axios.get(`${URL_API}/categories`)
  return data.response
}

export const getOneCategory = async (id) => {
  const { data } = await Axios.get(`${URL_API}/categories/${id}`)
  return data.response
}
export const postCategory = async (category) => {
  const { data } = await Axios.post(`${URL_API}/categories/`, category)
  return data.response
}

export const updateCategory = async (category, id) => {
  const { data } = await Axios.put(`${URL_API}/categories/${id}`, category)
  return data.response
}

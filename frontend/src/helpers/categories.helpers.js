import Axios from 'axios'

export const getAllCategories = async () => {
  const { data } = await Axios.get('/categories')
  return data.response
}

export const getOneCategory = async (id) => {
  const { data } = await Axios.get(`/categories/${id}`)
  return data.response
}
export const postCategory = async (category) => {
  const { data } = await Axios.post('/categories', category)
  return data.response
}

export const updateCategory = async (category, id) => {
  const { data } = await Axios.put(`/categories/${id}`, category)
  return data.response
}

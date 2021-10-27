import Axios from 'axios'
const URL_API = 'http://localhost:4000'

export const getAllUsers = async () => {
  const { data } = await Axios.get(`${URL_API}/users`)
  return data.response
}

export const getOneUser = async (id) => {
  const { data } = await Axios.get(`${URL_API}/users/${id}`)
  return data.response
}

export const postOneUser = async (user) => {
  const { data } = await Axios.post(`${URL_API}/users`, user)
  return data.response
}

export const updateUser = async (user, id) => {
  const { data } = await Axios.put(`${URL_API}/users/${id}`, user)
  return data.response
}

export const deleteOne = async (id, path) => {
  const { data } = await Axios.delete(`${URL_API}/${path}/${id}`)
  return data.response
}

export const getAllRoles = async () => {
  const { data } = await Axios.get(`${URL_API}/roles`)
  return data.response
}

export const postOneUserRoles = async (id, roles) => {
  const { data } = await Axios.post(`${URL_API}/roles`, { id, roles })
  return data.response
}

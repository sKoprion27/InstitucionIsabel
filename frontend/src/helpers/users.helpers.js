import Axios from 'axios'

export const getAllUsers = async () => {
  const { data } = await Axios.get('/users')
  return data.response
}

export const getOneUser = async (id) => {
  const { data } = await Axios.get(`/users/${id}`)
  return data.response
}

export const changeUserPassword = async (id, { password }) => {
  const { data } = await Axios.put(
    `/users/${id}/password`,
    { password }
  )
  return data.response
}
export const postOneUser = async (user) => {
  const { data } = await Axios.post('/users', user)
  return data.response
}

export const updateUser = async (user, id) => {
  const { data } = await Axios.put(`/users/${id}`, user)
  return data.response
}

export const getAllRoles = async () => {
  const { data } = await Axios.get('/roles')
  return data.response
}

export const postOneUserRoles = async (id, roles) => {
  const { data } = await Axios.post('/roles', { id, roles })
  return data.response
}

export const deleteOneElement = async (id, path) => {
  const { data } = await Axios.delete(`/${path}/${id}`)
  return data.response
}

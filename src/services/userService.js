import AuthAPI from './authInstance'

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/users/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/users/view/${data}`)
  return response.data
}

export const userService = {
  getAll,
  getOne,
}

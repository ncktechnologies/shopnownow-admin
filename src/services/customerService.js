import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/user/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/user/show/${data}`)
  return response.data
}

export const customerService = {
  getAll,
  getOne,
}

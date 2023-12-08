import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/group/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/group/show/${data}`)
  return response.data
}

export const groupService = {
  getAll,
  getOne,
}

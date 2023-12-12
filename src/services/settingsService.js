import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/settings/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/settings/show/${data}`)
  return response.data
}

const createSettings = async (data) => {
  const response = await AuthAPI.post(`/admin/settings`, data)
  return response.data
}

const editSettings = async (data) => {
  const response = await AuthAPI.put(`/admin/settings/${data.key}`, data)
  return response.data
}




export const settingsService = {
  getAll,
  getOne,
  createSettings,
  editSettings,
}

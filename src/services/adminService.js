import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/show/${data}`)
  return response.data
}

const createAdmin = async (data) => {
  const response = await AuthAPI.post(`/admin/notification/send-email-notification`, data)
  return response.data
}

const editAdmin = async (data) => {
  const response = await AuthAPI.post(`/admin/notification/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/delete-admin/${data}`)
  return response.data
}

export const adminService = {
  getAll,
  getOne,
  createAdmin,
  editAdmin,
  deleteOne,
}

import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/notification/get-bulk-email-notifications`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/users-notification/${data}`)
  return response.data
}

const sendToAllUsers = async (data) => {
  const response = await AuthAPI.post(`/admin/app-notifications/send-to-all-users`, data)
  return response.data
}

const sendToOneUser = async (data) => {
  const response = await AuthAPI.post(`/admin/app-notifications/send-to-user/${data.user_id}`, data)
  return response.data
}
const sendToMultipleUsers = async (data) => {
  const response = await AuthAPI.post(`/admin/app-notifications/send-to-users-by-id`, data)
  return response.data
}

const editNotification = async (data) => {
  const response = await AuthAPI.post(`/admin/notification/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/notification/delete/${data}`)
  return response.data
}

export const notificationService = {
  getAll,
  getOne,
  sendToAllUsers,
  sendToOneUser,
  sendToMultipleUsers,
  editNotification,
  deleteOne,
}

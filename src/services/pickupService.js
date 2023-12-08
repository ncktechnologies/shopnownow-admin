import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/pickup-charge/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/pickup-charge/show/${data}`)
  return response.data
}

const createPickup = async (data) => {
  const response = await AuthAPI.post(`/admin/pickup-charge/create`, data)
  return response.data
}

const editPickup = async (data) => {
  const response = await AuthAPI.post(`/admin/pickup-charge/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/pickup-charge/delete/${data}`)
  return response.data
}

export const pickupService = {
  getAll,
  getOne,
  createPickup,
  editPickup,
  deleteOne,
}

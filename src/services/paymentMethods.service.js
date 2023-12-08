import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/payment-method/lists`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/payment-method/show/${data}`)
  return response.data
}

const create = async (data) => {
  const response = await AuthAPI.post(`/admin/payment-method/create`, data)
  return response.data
}

const edit = async (data) => {
  const response = await AuthAPI.post(`/admin/payment-method/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/payment-method/delete/${data}`)
  return response.data
}

export const paymentMethodsService = {
  getAll,
  getOne,
  create,
  edit,
  deleteOne,
}

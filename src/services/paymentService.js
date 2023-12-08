import AuthAPI from './authInstance'

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/payment/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/payment/show/${data}`)
  return response.data
}

export const paymentService = {
  getAll,
  getOne,
}

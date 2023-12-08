import AuthAPI from './authInstance'

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/payment/topup-histories`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/payment/topup/show/${data}`)
  return response.data
}

export const paymentService = {
  getAll,
  getOne,
}

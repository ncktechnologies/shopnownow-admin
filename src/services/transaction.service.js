import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/transaction/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/transaction/show/${data}`)
  return response.data
}

const approve = async (data) => {
  const response = await AuthAPI.post(`/admin/transaction/approve`, { transaction_id: data })
  return response.data
}

const decline = async (data) => {
  const response = await AuthAPI.post(`/admin/transaction/decline`, { transaction_id: data })
  return response.data
}

export const transactionService = {
  getAll,
  getOne,
  approve,
  decline,
}

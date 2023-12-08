import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/insurance/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/insurance/show/${data}`)
  return response.data
}

const createInsurance = async (data) => {
  const response = await AuthAPI.post(`/admin/insurance/create`, data)
  return response.data
}

const editInsurance = async (data) => {
  const response = await AuthAPI.post(`/admin/insurance/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/insurance/delete/${data}`)
  return response.data
}

const getPopularInsurance = async () => {
  const response = await AuthAPI.get(`/user/insurance/popular-insurance`)
  return response.data
}

export const InsuranceService = {
  getAll,
  getOne,
  createInsurance,
  editInsurance,
  deleteOne,
  getPopularInsurance,
}

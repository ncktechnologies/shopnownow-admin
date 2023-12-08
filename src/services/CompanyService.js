import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/company/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/company/show/${data}`)
  return response.data
}

const createCompany = async (data) => {
  const response = await AuthAPI.post(`/admin/company/create`, data)
  return response.data
}

const editCompany = async (data) => {
  const response = await AuthAPI.post(`/admin/company/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/company/delete/${data}`)
  return response.data
}

export const CompanyService = {
  getAll,
  getOne,
  createCompany,
  editCompany,
  deleteOne,
}

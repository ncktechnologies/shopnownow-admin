import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/product/category/list`)
  return response.data
}


const getOne = async (data) => {
  const response = await AuthAPI.get(`/product/category/show/show/${data}`)
  return response.data
}

const create = async (data) => {
  const response = await AuthAPI.post(`/admin/service-category/create`, data)
  return response.data
}

const edit = async (data) => {
  const response = await AuthAPI.post(`/admin/service-category/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/service-category/delete/${data}`)
  return response.data
}

export const serviceCategoryService = {
  getAll,
  getOne,
  create,
  edit,
  deleteOne,
}

import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/category/list`)
  return response
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/category/show/${data}`)
  return response.data
}

const createCategory = async (data) => {
  const response = await AuthAPI.post(`/admin/category/create`, data)
  return response.data
}

const editCategory = async (formData) => {
  const response = await AuthAPI.post(`/admin/category/update/${formData.get('id')}`, formData)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/category/delete/${data}`)
  return response.data
}

const hideShowCategory = async (data) => {
  const response = await AuthAPI.post(`/admin/category/hide/${data}`)
  return response.data
}



export const CategoryService = {
  getAll,
  getOne,
  createCategory,
  editCategory,
  deleteOne,
  hideShowCategory
}

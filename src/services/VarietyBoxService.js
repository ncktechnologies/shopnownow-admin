import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/variety-box/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/variety-box/show/${data}`)
  return response.data
}

const create = async (data) => {
  const response = await AuthAPI.post(`/admin/variety-box/create`, data)
  return response.data
}

const edit = async (data) => {
  const response = await AuthAPI.post(`/admin/variety-box/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/variety-box/delete/${data}`)
  return response.data
}

const addProductToVarietyBox = async (data) => {
  const response = await AuthAPI.post(`/admin/variety-box/add-product`, data)
  return response.data
}

const varietyBoxCategory = async () => {
  const response = await AuthAPI.get(`/admin/variety-box/category/show`)
  return response.data
}

export const varietyBoxService = {
  getAll,
  getOne,
  create,
  edit,
  deleteOne,
  addProductToVarietyBox,
  varietyBoxCategory,
}

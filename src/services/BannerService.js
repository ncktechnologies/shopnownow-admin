import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/banner/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/banner/show/${data}`)
  return response.data
}

const createBanner = async (data) => {
  const response = await AuthAPI.post(`/admin/banner/create`, data)
  return response.data
}

const editBanner = async (data) => {
  const response = await AuthAPI.post(`/admin/banner/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/banner/delete/${data}`)
  return response.data
}

export const BannerService = {
  getAll,
  getOne,
  createBanner,
  editBanner,
  deleteOne,
}

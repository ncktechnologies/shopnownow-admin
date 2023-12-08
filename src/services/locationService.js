import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/location/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/location/show/${data}`)
  return response.data
}

const createLocation = async (data) => {
  const response = await AuthAPI.post(`/admin/location/create`, data)
  return response.data
}

const editLocation = async (data) => {
  const response = await AuthAPI.post(`/admin/location/update`, data)
  return response.data
}

const hideShowLocation = async (data) => {
  const response = await AuthAPI.post(`/admin/location/hide/${data}`)
  return response.data
}


export const locationService = {
  getAll,
  getOne,
  createLocation,
  editLocation,
  hideShowLocation,
}

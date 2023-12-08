import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/activity/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/activity/show/show/${data}`)
  return response.data
}

const createGlobalActivity = async (data) => {
  const response = await AuthAPI.post(`/admin/activity/global/create`, data)
  return response.data
}

const editGlobalActivity = async (data) => {
  const response = await AuthAPI.post(`/admin/activity/global/update`, data)
  return response.data
}

const createIndividualActivity = async (data) => {
  const response = await AuthAPI.post(`/admin/activity/individual/create`, data)
  return response.data
}

const editIndividualUserActivity = async (data) => {
  const response = await AuthAPI.post(`/admin/activity/individual/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/activity/destroy/${data}`)
  return response.data
}

export const activityService = {
  getAll,
  getOne,
  createGlobalActivity,
  editGlobalActivity,
  createIndividualActivity,
  editIndividualUserActivity,
  deleteOne,
}

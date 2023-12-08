import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/user/learnerclass/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/user/learnerclass/show/show/${data}`)
  return response.data
}

const createLearnerclass = async (data) => {
  const response = await AuthAPI.post(`/admin/learnerclass/create`, data)
  return response.data
}

const editLearnerclass = async (data) => {
  const response = await AuthAPI.post(`/admin/learnerclass/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/learnerclass/delete/${data}`)
  return response.data
}

export const learnerClassService = {
  getAll,
  getOne,
  createLearnerclass,
  editLearnerclass,
  deleteOne,
}

import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/user/subject/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/user/subject/show/show/${data}`)
  return response.data
}

const createSubject = async (data) => {
  const response = await AuthAPI.post(`/admin/subject/create`, data)
  return response.data
}

const editSubject = async (data) => {
  const response = await AuthAPI.post(`/admin/subject/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/subject/delete/${data}`)
  return response.data
}

export const subjectService = {
  getAll,
  getOne,
  createSubject,
  editSubject,
  deleteOne,
}

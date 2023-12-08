import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/lesson/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/lesson/show/${data}`)
  return response.data
}

const createLesson = async (data) => {
  const response = await AuthAPI.post(`/admin/lesson/create`, data)
  return response.data
}

const editLesson = async (data) => {
  const response = await AuthAPI.post(`/admin/lesson/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/lesson/delete/${data}`)
  return response.data
}

export const lessonService = {
  getAll,
  getOne,
  createLesson,
  editLesson,
  deleteOne,
}

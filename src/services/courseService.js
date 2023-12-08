import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/user/course/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/user/course/show/${data}`)
  return response.data
}

const createCourse = async (data) => {
  const response = await AuthAPI.post(`/admin/course/create`, data)
  return response.data
}

const editCourse = async (data) => {
  const response = await AuthAPI.post(`/admin/course/update`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/course/delete/${data}`)
  return response.data
}

const addCourseContent = async (data) => {
  const response = await AuthAPI.post(`/admin/course/add-content`, data)
  return response.data
}

export const courseService = {
  getAll,
  getOne,
  createCourse,
  editCourse,
  deleteOne,
  addCourseContent,
}

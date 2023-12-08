import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/user/learner-age/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/user/learner-age/show/show/${data}`)
  return response.data
}

const createLearnerAge = async (data) => {
  const response = await AuthAPI.post(`/admin/learner-age/create`, data)
  return response.data
}

const editLearnerAge = async (data) => {
  const response = await AuthAPI.post(`/admin/learner-age/update/${data['learner_age_id']}`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/learner-age/delete/${data}`)
  return response.data
}

export const learnerAgeService = {
  getAll,
  getOne,
  createLearnerAge,
  editLearnerAge,
  deleteOne,
}

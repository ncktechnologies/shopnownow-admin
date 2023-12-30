import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/quickguide/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/quickguide/show/${data}`)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/quickguide/delete/${data}`);
  return response.data;
};

const createQuickGuide = async (data) => {
  const response = await AuthAPI.post(`/admin/quickguide/create`, data)
  return response.data
}

const editQuickGuide = async (data) => {
  const response = await AuthAPI.put(`/admin/quickguide/update/${data.id}`, data)
  return response.data
}

const hideShowQuickGuide = async (data) => {
  const response = await AuthAPI.post(`/admin/quickguide/hide/${data}`)
  return response.data }

export const quickGuideService = {
  getAll,
  getOne,
  deleteOne,
  createQuickGuide,
  editQuickGuide,
  hideShowQuickGuide,
}

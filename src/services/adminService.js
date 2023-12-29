import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/show/${data}`)
  return response.data
}

const createAdmin = async (data) => {
  const response = await AuthAPI.post(`/admin/admin/create`, data)
  return response.data
}


const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/delete-admin/${data}`)
  return response.data
}

const deactivateAdmin = async (data) => {
  const response = await AuthAPI.post(`/admin/deactivate/${data}`)
  return response.data
}



const activateAdmin = async (data) => {
  const response = await AuthAPI.post(`/admin/activate/${data}`)
  return response.data
}


export const adminService = {
  getAll,
  getOne,
  createAdmin,
  deleteOne,
  deactivateAdmin,
  activateAdmin
}

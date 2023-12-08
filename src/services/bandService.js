import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/band/list`)
  return response
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/band/show/${data}`)
  return response.data
}

const createBand = async (data) => {
  const response = await AuthAPI.post(`/admin/band/create`, data)
  return response.data
}

const editBand = async (data) => {
  const response = await AuthAPI.put(`/admin/band/update/${data.band_id}`, data)
  return response.data
}





export const bandService = {
  getAll,
  getOne,
  createBand,
  editBand,

}

import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/user/service-provider/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/user/service-provider/show/${data}`)
  return response.data
}

const getByCategory = async (data) => {
  const response = await AuthAPI.post(`/user/service-provider/category`)
  return response.data
}


export const serviceProviderService = {
  getAll,
  getOne,
  getByCategory,
}

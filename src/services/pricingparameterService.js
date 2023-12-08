import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/pricing-parameters/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/pricing-parameters/show/${data}`)
  return response.data
}

const createPricingParameter = async (data) => {
  const response = await AuthAPI.post(`/admin/pricing-parameters/add-option`, data)
  return response.data
}

const editPricingParameter = async (data) => {
  const response = await AuthAPI.post(`/admin/pricing-parameters/update-option `, data)
  return response.data
}


export const pricingparameterService = {
  getAll,
  getOne,
  createPricingParameter,
  editPricingParameter,
}

import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/delivery-locations/list`)
  return response
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/delivery-locations/list/${data}`)
  return response.data
}

const createDeliveryLocation = async (data) => {
  const response = await AuthAPI.post(`/admin/delivery-locations/create`, data)
  return response.data
}

const editDeliveryLocation = async (data) => {
  const response = await AuthAPI.put(`/admin/delivery-locations/update/${data.delivery_id}`, data)
  return response.data
}

const deleteDeliveryLocation = async (data) => {
    const response = await AuthAPI.delete(`/admin/delivery-locations/delete/${data}`)
    return response.data
  }
  




export const deliveryLocationService = {
  getAll,
  getOne,
  createDeliveryLocation,
  editDeliveryLocation,
  deleteDeliveryLocation

}

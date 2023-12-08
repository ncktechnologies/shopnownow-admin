import AuthAPI from './authInstance'

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/rider`)
  return response.data
}


const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/rider/${data}`)
  return response.data
}

const createRider = async (data) => {
  const response = await AuthAPI.post(`/admin/rider`, data)
  return response.data
}

const blockRider = async (data) => {
  const response = await AuthAPI.post(`/admin/rider/block/${data}`)
  return response.data
}

const approveRiderDoc = async (data) => {
  const response = await AuthAPI.post(`/admin/rider/rider-doc/approve-all/${data}`)
  return response.data
}
const declineRiderDoc = async (data) => {
  const response = await AuthAPI.post(`/admin/rider/rider-doc/decline`, data)
  return response.data
}

const assignRiderToOrder = async (data) => {
  const response = await AuthAPI.post(`/admin/rider/assign`, data)
  return response.data
}

const updateStatus = async (data) => {
  const response = await AuthAPI.post(`/admin/order/status/${data.order_id}`, data)
  return response.data
}


export const riderService = {
  getAll,
  getOne,
  createRider,
  blockRider,
  approveRiderDoc,
  declineRiderDoc,
  assignRiderToOrder,
  updateStatus
}

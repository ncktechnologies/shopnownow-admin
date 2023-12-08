import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/wallet/activities/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/wallet/activity/show/${data}`)
  return response.data
}

const approve = async (data) => {
  const response = await AuthAPI.post(`/admin/approve/withdrawal-request/${data}`)
  return response.data
}

const decline = async (data) => {
    const response = await AuthAPI.post(`/admin/decline/withdrawal-request/${data}`)
    return response.data
}

export const walletService = {
  getAll,
  getOne,
  approve,
  decline,
}

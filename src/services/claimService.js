import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/claim/list`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/claim/show/${data}`)
  return response.data
}

const getPaidClaims = async (data) => {
  const response = await AuthAPI.get(`/admin/claim/paid-claims`)
  return response.data
}

const updateClaimStatus = async (data) => {
  const response = await AuthAPI.post(`/admin/claim/update-status`, data)
  return response.data
}

export const claimService = {
  getAll,
  getOne,
  getPaidClaims,
  updateClaimStatus,
}

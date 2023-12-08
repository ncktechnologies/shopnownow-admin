import AuthAPI from './authInstance'

const getDashboardStats = async () => {
  const response = await AuthAPI.get(`/admin/dashboard/stats`)
  return response
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/user/show/${data}`)
  return response.data
}

export const dashboardService = {
  getDashboardStats,
  getOne,
}

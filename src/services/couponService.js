import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/coupons/list`)
  return response
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/coupons/show/${data}`)
  return response.data
}

const createCoupon = async (data) => {
  const response = await AuthAPI.post(`/admin/coupons/create`, data)
  return response.data
}

const editCoupon = async (data) => {
  const response = await AuthAPI.put(`/admin/coupons/update/${data.coupon_id}`, data)
  return response.data
}





export const couponService = {
  getAll,
  getOne,
  createCoupon,
  editCoupon,

}

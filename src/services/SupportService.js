import AuthAPI from './authInstance'

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/contact-support/list-contacts`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/contact-support/${data}`)
  return response.data
}

export const SupportService = {
  getAll,
  getOne,
}

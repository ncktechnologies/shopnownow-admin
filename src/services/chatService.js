import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/user/chat/list-contacts`)
  return response.data
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/user/chat/list-contacts/${data}`)
  return response.data
}

export const chatService = {
  getAll,
  getOne,
}

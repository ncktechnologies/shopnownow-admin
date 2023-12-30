import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/delivery-time-slots/list`)
  return response
}

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/delivery-time-slots/show/${data}`)
  return response.data
}

const createTimeSlot = async (data) => {
  const response = await AuthAPI.post(`/admin/delivery-time-slots/create`, data)
  return response.data
}

const editTimeSlot = async (data) => {
  const response = await AuthAPI.post(`/admin/delivery-time-slots/update/${data.timeslot_id}`, data)
  return response.data
}

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/delivery-time-slots/delete/${data}`);
  return response.data;
};


const hideTimeSlot = async (data) => {
    const response = await AuthAPI.post(`/admin/delivery-time-slots/hide/${data}`)
    return response.data
  }


  
  const showTimeSlot = async (data) => {
    const response = await AuthAPI.post(`/admin/delivery-time-slots/unhide/${data}`)
    return response.data
  }




export const timeSlotService = {
  getAll,
  getOne,
  deleteOne,
  createTimeSlot,
  hideTimeSlot, showTimeSlot, editTimeSlot
}

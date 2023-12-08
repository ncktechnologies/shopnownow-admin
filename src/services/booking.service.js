import AuthAPI from "./authInstance";

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/booking/list`);
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/booking/show/${data}`);
  return response.data;
};

const getByStatus = async (data) => {
  const response = await AuthAPI.post(`/admin/booking/status`);
  return response.data;
};

export const bookingService = {
  getAll,
  getOne,
  getByStatus,
};

import AuthAPI from "./authInstance";

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/special_request/list`);
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/special_request/list/${data}`);
  return response.data;
};

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/special_request/delete/${data}`);
  return response.data;
};

export const specialRequestService = {
  getAll,
  getOne,
  deleteOne,
};

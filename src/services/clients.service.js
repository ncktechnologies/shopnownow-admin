import AuthAPI from "./authInstance";

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/client/list`);
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/client/show/${data}`);
  return response.data;
};



export const clientService = {
  getAll,
  getOne,
};

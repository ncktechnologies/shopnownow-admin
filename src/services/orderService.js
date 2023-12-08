import AuthAPI from "./authInstance";

const getAll = async () => {
  const response = await AuthAPI.get(`/admin/orders/list`);
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/orders/order/${data}`);
  return response.data;
};

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/orders/delete/${data}`);
  return response.data;
};

const updateStatus = async (data) => {
  const response = await AuthAPI.put(`/admin/orders/update/${data.order_id}`, data)
  return response.data
}

export const orderService = {
  getAll,
  getOne,
  deleteOne,
  updateStatus
};

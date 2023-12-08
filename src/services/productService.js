import AuthAPI from "./authInstance";

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/product/list`);
  return response.data;
};

const getTopRatedProduct = async (data) => {
  const response = await AuthAPI.get(`/admin/product/top-rated`);
  return response.data;
};

const getOne = async (data) => {
  const response = await AuthAPI.get(`admin/product/show/${data}`);
  return response.data;
};


const create = async (data) => {
  const response = await AuthAPI.post(`/admin/product/create`, data);
  return response.data;
};

const edit = async (data) => {
  const response = await AuthAPI.post(`/admin/product/update`, data);
  return response.data;
};

const deleteOne = async (data) => {
  const response = await AuthAPI.delete(`/admin/product/delete/${data}`);
  return response.data;
};

const addRelatedProduct = async (data) => {
  const response = await AuthAPI.post(
    `/admin/product/create/related-product`,
    data
  );
  return response.data;
};

export const productService = {
  getAll,
  getOne,
  create,
  edit,
  deleteOne,
  addRelatedProduct,
  getTopRatedProduct
};

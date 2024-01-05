import AuthAPI from "./authInstance";

// product.service.js

const getAll = async (page) => {
  const response = await AuthAPI.get(`/admin/product/list?page=${page}`);
  return response.data;
};

// ... (other methods remain unchanged)


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

const search = async (data) => {
  const response = await AuthAPI.get(`/admin/product/search/${data}`);
  return response.data;
};


const filter = async (data) => {
  const response = await AuthAPI.post(`/admin/product/filter`, data);
  return response.data;
};

const edit = async (formData) => {
  const response = await AuthAPI.post(`/admin/product/update/${formData.get('product_id')}`, formData);
  return response.data;
};

const hideShowProduct = async (data) => {
  const response = await AuthAPI.post(`/admin/product/toggle/${data}`)
  return response.data
}

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
  filter,
  search,
  deleteOne,
  hideShowProduct,
  addRelatedProduct,
  getTopRatedProduct
};

import AuthAPI from "./authInstance";

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/job/list`);
  return response.data;
};

const getAllFeatured = async (data) => {
    const response = await AuthAPI.get(`/admin/job/featured-jobs`);
    return response.data;
  };

const getOne = async (data) => {
  const response = await AuthAPI.get(`/admin/job/show/${data}`);
  return response.data;
};

const featureJob = async (data) => {
  const response = await AuthAPI.post(`/admin/job/feature-job/${data}`);
  return response.data;
};



export const jobService = {
  getAll,
  getOne,
  getAllFeatured,
  featureJob
};

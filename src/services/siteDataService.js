import AuthAPI from './authInstance'

const getAll = async (data) => {
  const response = await AuthAPI.get(`/admin/site-data/site_data`)
  return response.data
}


const editSiteData = async (data) => {
  const response = await AuthAPI.put(`/admin/site-data/site_data`, data);
  return response.data;
};


export const siteDataService = {
  getAll,
  editSiteData
}
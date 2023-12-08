import axios from "axios";
import ExpirySession from "../utils/expirySession";
export const liveBaseURL = "https://now.ncktech.com/api/v1/";

const instance = axios.create({
  // baseURL: testBaseURL,
  baseURL: liveBaseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (config) => {
    const { access_token } = ExpirySession.get("user");

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
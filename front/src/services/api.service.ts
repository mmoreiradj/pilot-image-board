import axios from "axios";
export const API_BASE_URL =
  process.env.VUE_APP_NODE_ENV === "production"
    ? `https://api.${window.location.hostname}/v1`
    : process.env.VUE_APP_API_BASE_URL;

axios.defaults.withCredentials = true;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export let apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
});

export const refreshApiService = () => {
  apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

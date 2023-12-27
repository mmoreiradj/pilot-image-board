import { API_BASE_URL, apiService, refreshApiService } from "./api.service";
import { User } from "@/models";
import axios from "axios";
import { useUserStore } from "@/stores";

export const authService = {
  signUp: (data: User) => {
    return apiService.post("/auth/signup", data);
  },
  signIn: (data: User) => {
    return apiService.post("/auth/signin", data);
  },
  refresh: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        useUserStore().emptyUser();
        return false;
      }

      const base64Url = refreshToken.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const decodedToken = JSON.parse(window.atob(base64));

      if (new Date(decodedToken.exp * 1000) < new Date()) {
        useUserStore().emptyUser();
        return false;
      }

      const response = await axios.post(API_BASE_URL + "/auth/refresh", {
        refresh_token: refreshToken,
      });

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      useUserStore().initUser();
      refreshApiService();
      return true;
    } catch (error) {
      useUserStore().emptyUser();
      return false;
    }
  },
};

import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "@/models";
import axios from "axios";
import { API_BASE_URL, refreshApiService } from "@/services";

export const useUserStore = defineStore("user", () => {
  const user = ref({} as User);

  const initUser = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // base64 decode token
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const decodedToken = JSON.parse(window.atob(base64));
      user.value = decodedToken as User;
    }
  };

  /**
   * @Deprecated use is function
   */
  const isAdmin = () => {
    return user.value.roles?.includes("admin");
  };

  const is = (role: string) => {
    return user.value.roles?.includes(role);
  };

  const emptyUser = () => {
    user.value = {} as User;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  initUser();

  const isConnected = () => {
    return user.value.id !== undefined && localStorage.getItem("access_token");
  };

  const refreshUser = async () => {
    if (
      !localStorage.getItem("access_token") ||
      !localStorage.getItem("refresh_token")
    ) {
      emptyUser();
      return false;
    }
    const token = localStorage.getItem("refresh_token");
    if (token) {
      try {
        const response = await axios
          .create({
            baseURL: API_BASE_URL,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .post("/auth/refresh");
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        refreshApiService();

        initUser();
        return true;
      } catch (error) {
        emptyUser();
        return false;
      }
    } else {
      emptyUser();
      return false;
    }
  };

  return { user, isConnected, initUser, emptyUser, isAdmin, is, refreshUser };
});

import { apiService } from "./api.service";

export const userService = {
  profile: () => {
    return apiService.post("/user/self");
  },
  getUsers: (params: any = {}) => {
    return apiService.get("/users", { params });
  },
  getUser: (id: number) => {
    return apiService.get(`/users/${id}`);
  },
  createUser: (data: any) => {
    return apiService.post("/users", data);
  },
  updateUser: (id: number, data: any) => {
    return apiService.patch(`/users/${id}`, data);
  },
  deleteUser: (id: number) => {
    return apiService.delete(`/users/${id}`);
  },
};

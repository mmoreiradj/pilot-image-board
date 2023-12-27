import { apiService } from "@/services/api.service";

export const roleService = {
  getRoles: (params: any = {}) => {
    return apiService.get("/roles", { params });
  },
  addRoleToUser: (userId: number, roleId: number) => {
    return apiService.post(`/users/${userId}/roles`, {
      roleId,
    });
  },
  removeRoleFromUser: (userId: number, roleId: number) => {
    return apiService.delete(`/users/${userId}/roles/${roleId}`, {
      validateStatus: (status: number) =>
        (status >= 200 && status < 300) || status === 404,
    });
  },
};

import { apiService } from "@/services/api.service";
import { Category } from "@/models";

export const categoryService = {
  getCategories: (params: any = {}) => {
    return apiService.get("/categories", { params });
  },
  getCategory: (id: number) => {
    return apiService.get(`/categories/${id}`);
  },
  createCategory: (data: Category) => {
    return apiService.post("/categories", data);
  },
  updateCategory: (id: number, data: Category) => {
    return apiService.patch(`/categories/${id}`, data);
  },
  deleteCategory: (id: number) => {
    return apiService.delete(`/categories/${id}`);
  },
};

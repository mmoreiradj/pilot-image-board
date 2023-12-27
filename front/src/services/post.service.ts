import { apiService } from "@/services/api.service";
import { Post } from "@/models";

export const postService = {
  getPosts: (params: any = {}) => {
    return apiService.get("/posts", { params });
  },
  getPost: (id: number) => {
    return apiService.get(`/posts/${id}`);
  },
  createPost: (data: Post) => {
    return apiService.post("/posts", data);
  },
  updatePost: (id: number, data: Post) => {
    return apiService.patch(`/posts/${id}`, data);
  },
  deletePost: (id: number) => {
    return apiService.delete(`/posts/${id}`);
  },
};

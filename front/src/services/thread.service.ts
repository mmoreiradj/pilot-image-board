import { apiService } from "@/services/api.service";
import { Thread } from "@/models";

export const threadService = {
  getThreads: (params: any = {}) => {
    return apiService.get("/threads", { params });
  },
  getThread: (id: number) => {
    return apiService.get(`/threads/${id}`);
  },
  createThread: (data: Thread) => {
    return apiService.post("/threads", data);
  },
  updateThread: (id: number, data: Thread) => {
    return apiService.patch(`/threads/${id}`, data);
  },
  deleteThread: (id: number) => {
    return apiService.delete(`/threads/${id}`);
  },
};

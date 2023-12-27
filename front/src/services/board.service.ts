import { apiService } from "@/services/api.service";
import { Board } from "@/models";

export const boardService = {
  getBoards: (params: any = {}) => {
    return apiService.get("/boards", { params });
  },
  getBoard: (id: number) => {
    return apiService.get(`/boards/${id}`);
  },
  createBoard: (data: Board) => {
    return apiService.post("/boards", data);
  },
  updateBoard: (id: number, data: Board) => {
    return apiService.patch(`/boards/${id}`, data);
  },
  deleteBoard: (id: number) => {
    return apiService.delete(`/boards/${id}`);
  },
};

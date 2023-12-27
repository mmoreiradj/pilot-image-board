import { apiService } from "@/services/api.service";

export const imageService = {
  postImage: (params: FormData) => {
    return apiService.post("/images", params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

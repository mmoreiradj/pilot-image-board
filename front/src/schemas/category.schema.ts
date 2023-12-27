import * as yup from "yup";

export const yupCategorySchema = yup.object({
  name: yup.string().required().max(20).label("Name"),
  description: yup.string().required().max(255).label("Description"),
});

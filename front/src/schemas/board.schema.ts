import * as yup from "yup";

export const yupBoardSchema = yup.object({
  categoryId: yup.number().required().label("Category"),
  title: yup.string().required().max(25).label("Title"),
  description: yup.string().required().max(255).label("Description"),
});

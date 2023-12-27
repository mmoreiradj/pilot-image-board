import * as yup from "yup";

export const yupThreadSchema = yup.object({
  boardId: yup.number().required().label("Board"),
  title: yup.string().required().max(20).label("Title"),
  description: yup.string().required().max(512).label("Description"),
});

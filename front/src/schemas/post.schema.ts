import * as yup from "yup";

export const yupPostSchema = yup.object({
  threadId: yup.number().required(),
  description: yup.string().required().max(512).label("Message"),
});

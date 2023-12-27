import * as yup from "yup";

export const yupUserRoleSchema = yup.object({
  action: yup.mixed().oneOf(["add", "remove"]).label("Action"),
  roleId: yup.number().required().label("Role"),
});

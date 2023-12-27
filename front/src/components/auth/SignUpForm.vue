<script setup lang="ts">
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useForm } from "vee-validate";
import { computed, defineEmits } from "vue";

const emit = defineEmits(["submit"]);

const userSchema = computed(() => {
  return yup.object({
    username: yup.string().required().min(8).label("Username"),
    password: yup
      .string()
      .required()
      .min(12)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}/,
        "Your password needs at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"
      )
      .label("Password"),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match!"),
    terms: yup.bool().required("This box needs to be checked"),
  });
});

useForm({
  validationSchema: userSchema,
});

const onSubmit = (values: never, actions: never) => {
  emit("submit", values, actions);
};
</script>

<template>
  <article
    class="container d-flex flex-column align-items-center justify-content-center bg-white border-start border-end"
  >
    <div class="d-flex justify-content-start">
      <h1>Sign up</h1>
    </div>
    <Form
      class="mt-3 d-flex justify-content-center flex-column"
      @submit="onSubmit"
      :validation-schema="userSchema"
      v-slot="{ errors }"
      style="max-width: 500px; width: 100%"
    >
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <Field
          name="username"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
          id="username"
        />
        <ErrorMessage name="username" class="text-danger form-text" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          id="password"
        />
        <ErrorMessage name="password" class="text-danger form-text text-wrap" />
      </div>
      <div class="mb-3">
        <label for="password-check" class="form-label"
          >Type your password again</label
        >
        <Field
          name="passwordCheck"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.passwordCheck }"
          id="password-check"
        />
        <ErrorMessage name="passwordCheck" class="text-danger form-text" />
      </div>
      <div class="mb-3 form-check">
        <Field
          name="terms"
          :value="false"
          type="checkbox"
          class="form-check-input"
          :class="{ 'is-invalid': errors.terms }"
          id="terms-check"
        />
        <label
          class="form-check-label d-block"
          for="terms-check"
          style="transform: translateY(3px)"
        >
          I accept the privacy policy and user agreements
        </label>
        <ErrorMessage name="terms" class="text-danger form-text" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </Form>
  </article>
</template>

<script lang="ts">
export default {
  name: "SignUpForm",
};
</script>

<style scoped>
article {
  min-height: 80vh;
}
</style>

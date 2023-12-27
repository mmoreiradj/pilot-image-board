<script setup lang="ts">
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useForm } from "vee-validate";
import { computed, defineEmits } from "vue";

const emit = defineEmits(["submit"]);

const userSchema = computed(() => {
  return yup.object({
    username: yup.string().required().label("Username"),
    password: yup.string().required().label("Password"),
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
    class="bg-white container d-flex flex-column align-items-center justify-content-center border-start border-end"
  >
    <div class="d-flex justify-content-start">
      <h1>Sign in</h1>
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </Form>
  </article>
</template>

<script lang="ts">
export default {
  name: "SignInForm",
};
</script>

<style scoped>
article {
  min-height: 75vh;
}
</style>

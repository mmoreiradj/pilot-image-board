<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { Category } from "@/models";
import { yupCategorySchema } from "@/schemas";

const emit = defineEmits(["form-submitted"]);
const category = ref({} as Category);

const props = defineProps({
  category: {
    type: Object,
    required: false,
  },
});

const userSchema = computed(() => {
  return yupCategorySchema;
});

const onSubmit = (values: never, actions: never) => {
  emit("form-submitted", values, actions);
};
</script>

<template>
  <Form
    :initial-values="props?.category?.id ? props.category : {}"
    as="form"
    id="category-form"
    class="mt-3 d-flex justify-content-center flex-column"
    @submit="onSubmit"
    :validation-schema="userSchema"
    v-slot="{ errors }"
    style="max-width: 500px; width: 100%"
  >
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.name }"
        id="username"
      />
      <ErrorMessage name="name" class="text-danger form-text" />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <Field
        name="description"
        as="textarea"
        class="form-control"
        :class="{ 'is-invalid': errors.description }"
        id="password"
      />
      <ErrorMessage
        name="description"
        class="text-danger form-text text-wrap"
      />
    </div>
    <div class="d-flex flex-row justify-content-center">
      <router-link :to="{ name: 'admin' }" class="btn btn-secondary me-2">
        <font-awesome-icon icon="arrow-left" />
        Cancel
      </router-link>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </Form>
</template>

<script lang="ts">
export default {
  name: "CategoryForm",
};
</script>

<style scoped></style>

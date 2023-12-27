<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
import { yupThreadSchema } from "@/schemas";
import { Form, Field, ErrorMessage } from "vee-validate";

const emit = defineEmits(["form-submitted"]);

defineProps({
  boardId: {
    type: Number,
    required: false,
  },
});

const threadSchema = computed(() => {
  return yupThreadSchema;
});

const onSubmit = (values: never, actions: never) => {
  emit("form-submitted", values, actions);
};
</script>

<template>
  <Form
    as="form"
    id="category-form"
    class="mt-3 d-flex justify-content-center flex-column"
    @submit="onSubmit"
    :validation-schema="threadSchema"
    v-slot="{ errors }"
    style="max-width: 500px; width: 100%"
  >
    <Field name="boardId" type="hidden" :value="boardId" />
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <Field
        type="text"
        name="title"
        class="form-control"
        :class="{ 'is-invalid': errors.title }"
        id="title"
      />
      <ErrorMessage name="title" class="text-danger form-text" />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <Field
        name="description"
        as="textarea"
        class="form-control"
        :class="{ 'is-invalid': errors.description }"
        id="description"
      />
      <ErrorMessage name="description" class="text-danger form-text" />
    </div>
    <div class="d-flex flex-row justify-content-center">
      <router-link
        :to="{ name: 'board', params: { boardId } }"
        class="btn btn-secondary me-2"
      >
        <font-awesome-icon icon="arrow-left" />
        Cancel
      </router-link>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </Form>
</template>

<script lang="ts">
export default {
  name: "ThreadForm",
};
</script>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
import { yupPostSchema } from "@/schemas";
import { Form, Field, ErrorMessage } from "vee-validate";

const emit = defineEmits(["form-submitted"]);

defineProps({
  boardId: {
    type: Number,
    required: true,
  },
  threadId: {
    type: Number,
    required: true,
  },
});

const postSchema = computed(() => {
  return yupPostSchema;
});

const onSubmit = (values: never, actions: never) => {
  emit("form-submitted", values, actions);
};
</script>

<template>
  <Form
    as="form"
    id="create-post-form"
    class="mt-3 d-flex justify-content-center flex-column"
    @submit="onSubmit"
    :validation-schema="postSchema"
    v-slot="{ errors }"
    style="max-width: 500px; width: 100%"
  >
    <Field name="threadId" type="hidden" :value="threadId" />
    <div class="mb-3">
      <label for="description" class="form-label">Message</label>
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
        :to="{
          name: 'thread',
          params: { boardId: boardId, threadId: threadId },
        }"
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
  name: "PostForm",
};
</script>

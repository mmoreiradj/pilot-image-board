<script setup lang="ts">
import { computed, defineEmits, ref, defineProps } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { yupBoardSchema } from "@/schemas";
import { Category } from "@/models";
import { categoryService } from "@/services";
import { useAlertsStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter();
const alertsStore = useAlertsStore();
const emit = defineEmits(["form-submitted"]);
const categories = ref([] as Category[]);

try {
  const response = await categoryService.getCategories({
    limit: 100000,
  });
  categories.value = response.data.results;
} catch (error) {
  alertsStore.addAlert({
    type: "error",
    description: "Error fetching categories",
    timeout: 5000,
  });
  await router.push({
    name: "admin",
  });
}

defineProps({
  board: {
    type: Object,
    required: false,
  },
});

const boardSchema = computed(() => {
  return yupBoardSchema;
});

const onSubmit = (values: never, actions: never) => {
  emit("form-submitted", values, actions);
};
</script>

<template>
  <Form
    :initial-values="board?.id ? board : {}"
    as="form"
    id="category-form"
    class="mt-3 d-flex justify-content-center flex-column"
    @submit="onSubmit"
    :validation-schema="boardSchema"
    v-slot="{ errors }"
    style="max-width: 500px; width: 100%"
  >
    <div class="mb-3">
      <label for="categoryId" class="form-label">Category</label>
      <Field
        as="select"
        name="categoryId"
        class="form-select"
        :class="{ 'is-invalid': errors.categoryId }"
        id="categoryId"
      >
        <option value="" selected disabled hidden>Choose a category...</option>
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </Field>
      <ErrorMessage name="categoryId" class="text-danger form-text" />
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <Field
        name="title"
        type="text"
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
  name: "BoardForm",
};
</script>

<style scoped></style>

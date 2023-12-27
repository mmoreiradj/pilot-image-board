<script setup lang="ts">
import CategoryForm from "@/components/admin/CategoryForm.vue";
import { Category } from "@/models";
import { useRouter } from "vue-router";
import { authService, categoryService } from "@/services";
import { useAlertsStore } from "@/stores";

const router = useRouter();
const alertsStore = useAlertsStore();

const onSubmit = async (values: Category, actions: any) => {
  try {
    await categoryService.createCategory(values);
    alertsStore.addAlert({
      type: "success",
      description: "Category created successfully",
      timeout: 5000,
    });
    await router.push({
      name: "admin",
    });
  } catch (error: any) {
    if (
      error?.response?.status === 400 &&
      error.response.data.error.code === 2000 &&
      error.response.data.error.field === "name"
    ) {
      actions.setErrors({
        name: ["A category with this name already exists"],
      });
    } else if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await onSubmit(values, actions);
      } else {
        await router.push({
          name: "home",
        });
      }
    } else if (error?.response?.status === 403) {
      await router.push({
        name: "home",
      });
    } else {
      alertsStore.addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
      await router.push({
        name: "admin",
      });
    }
  }
};
</script>

<template>
  <article
    class="bg-white container d-flex flex-column align-items-center justify-content-center border-end border-start"
    style="height: 75vh"
  >
    <div class="d-flex justify-content-start">
      <h1>Create category</h1>
    </div>
    <Suspense>
      <category-form @form-submitted="onSubmit" />
      <template #fallback> Loading...</template>
    </Suspense>
  </article>
</template>

<script lang="ts">
export default {
  name: "CreateCategoryView",
};
</script>

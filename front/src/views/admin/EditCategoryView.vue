<script setup lang="ts">
import CategoryForm from "@/components/admin/CategoryForm.vue";
import { Category } from "@/models";
import { useRoute, useRouter } from "vue-router";
import { authService, categoryService } from "@/services";
import { ref } from "vue";
import { useAlertsStore } from "@/stores";

const alertsStore = useAlertsStore();

const category = ref({} as Category);
const failed = ref(false);

const route = useRoute();
const router = useRouter();
const categoryId = +route.params.categoryId;

if (Number.isNaN(categoryId)) {
  failed.value = true;
  router.replace({
    name: "not-found",
    params: { pathMatch: route.path.substring(1).split("/") },
    query: route.query,
    hash: route.hash,
  });
} else {
  try {
    const response = await categoryService.getCategory(categoryId);
    category.value = response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      failed.value = true;
      router.replace({
        name: "not-found",
        params: { pathMatch: route.path.substring(1).split("/") },
        query: route.query,
        hash: route.hash,
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
}

const onSubmit = async (values: Category, actions: any) => {
  try {
    await categoryService.updateCategory(categoryId, values);
    alertsStore.addAlert({
      type: "success",
      description: "Category updated successfully",
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
    } else if (error?.response?.status === 403) {
      await router.push({
        name: "home",
      });
    } else if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await onSubmit(values, actions);
      } else {
        await router.push({
          name: "signin",
        });
      }
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
    v-if="!failed"
    class="bg-white container d-flex flex-column align-items-center justify-content-center border-end border-start"
    style="height: 75vh"
  >
    <div class="d-flex justify-content-start">
      <h1>Update category</h1>
    </div>
    <Suspense>
      <category-form @form-submitted="onSubmit" :category="category" />
      <template #fallback> Loading...</template>
    </Suspense>
  </article>
</template>

<script lang="ts">
export default {
  name: "EditCategoryView",
};
</script>

<style scoped></style>

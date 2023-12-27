<script setup lang="ts">
import { useAlertsStore } from "@/stores";
import { authService, categoryService } from "@/services";
import CustomModal from "@/components/common/CustomModal.vue";
import { ref, defineEmits } from "vue";
import { Category } from "@/models";
import router from "@/router";

const alertsStore = useAlertsStore();

const categories = ref([] as Category[]);

const showDeleteModal = ref(false);
const selectedCategory = ref(null as number | null);

const openDeleteModal = (categoryId: number) => {
  selectedCategory.value = categoryId;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedCategory.value = null;
};

try {
  const response = await categoryService.getCategories({
    limit: 100000,
    offset: 0,
  });
  categories.value = response.data.results;
} catch (error) {
  alertsStore.addAlert({
    type: "error",
    description: "Could not load categories",
    timeout: 5000,
  });
}

const handleDelete = async () => {
  try {
    if (selectedCategory.value) {
      await categoryService.deleteCategory(selectedCategory.value);
      alertsStore.addAlert({
        type: "success",
        description: "Category deleted successfully",
        timeout: 5000,
      });
      categories.value = categories.value.filter(
        (category) => category.id !== selectedCategory.value
      );
      closeDeleteModal();
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await handleDelete();
      } else {
        await router.push({ name: "signin" });
      }
    } else if (error?.response?.status === 403) {
      await router.push({ name: "signin" });
    } else {
      alertsStore.addAlert({
        type: "error",
        description: "Error deleting category, refresh page and try again",
        timeout: 5000,
      });
    }
  }
};
</script>

<template>
  <table class="table table-hover table-responsive table-striped">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Created</th>
        <th scope="col">Last updated</th>
        <th scope="colgroup">Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="categories.length > 0">
        <tr v-for="category in categories" :key="category.id">
          <th v-html="category.name"></th>
          <td class="text-wrap" v-html="category.description"></td>
          <td v-html="new Date(category.createdAt).toLocaleDateString()"></td>
          <td v-html="new Date(category.updatedAt).toLocaleDateString()"></td>
          <td class="d-flex flex-row">
            <router-link
              :to="{
                name: 'edit-category',
                params: { categoryId: category.id },
              }"
              class="btn btn-success me-2"
              :value="category.id"
            >
              Edit
            </router-link>
            <button
              class="btn btn-danger me-2"
              @click="openDeleteModal(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="6" class="text-center">No categories yet</td>
      </tr>
    </tbody>
  </table>
  <custom-modal v-model="showDeleteModal">
    <template #title>
      <h3>Delete Category</h3>
    </template>
    <p>Are you sure you want to delete this category?</p>
    <template #footer>
      <button class="btn btn-secondary" @click="closeDeleteModal">
        <font-awesome-icon icon="arrow-left" />
        Cancel
      </button>
      <button class="btn btn-danger" @click="handleDelete">Delete</button>
    </template>
  </custom-modal>
</template>

<script lang="ts">
export default {
  name: "CategoryList",
};
</script>

<style scoped></style>

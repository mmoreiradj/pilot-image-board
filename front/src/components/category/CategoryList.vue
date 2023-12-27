<script setup lang="ts">
import { categoryService } from "@/services";
import { Category } from "@/models";
import CardComponent from "@/components/common/CardComponent.vue";
import { useAlertsStore } from "@/stores";
import { ref } from "vue";
import LoadingComponent from "@/components/common/LoadingComponent.vue";
import SmallBoardList from "@/components/board/SmallBoardList.vue";

const categories = ref([] as Category[]);

try {
  const response = await categoryService.getCategories();
  categories.value = response.data.results;
} catch (error) {
  useAlertsStore().addAlert({
    description: "Something went wrong, please try again later",
    type: "error",
    timeout: 5000,
  });
}
</script>

<template>
  <div class="d-flex flex-wrap justify-content-start row gx-2">
    <div
      v-for="category in categories"
      :key="category.id"
      class="col-12 col-md-6 col-lg-4 col-xl-3 mb-2"
    >
      <card-component>
        <template #header>
          <h3>{{ category.name }}</h3>
        </template>
        <template #body>
          <Suspense>
            <small-board-list :categoryId="category.id" />
            <template #fallback>
              <loading-component />
            </template>
          </Suspense>
        </template>
      </card-component>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CategoryList",
};
</script>

<style scoped></style>

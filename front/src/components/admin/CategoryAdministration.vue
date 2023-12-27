<script setup lang="ts">
import CategoryTable from "@/components/admin/CategoryTable.vue";
</script>

<template>
  <article class="card">
    <div class="card-header d-flex justify-content-between">
      <h2 class="mb-0">Categories</h2>
      <router-link :to="{ name: 'create-category' }" class="btn btn-primary">
        Add category
      </router-link>
    </div>
    <div class="card-body overflow-scroll">
      <Suspense>
        <category-table />
        <template #fallback> Loading...</template>
      </Suspense>
    </div>
  </article>
</template>

<script lang="ts">
export default {
  name: "CategoryAdministration",
};
</script>

<style scoped></style>

<script setup lang="ts">
import BoardList from "@/components/admin/BoardTable.vue";
</script>

<template>
  <article class="card">
    <div class="card-header d-flex justify-content-between" id="headingOne">
      <h2 class="mb-0">Boards</h2>
      <router-link :to="{ name: 'create-board' }" class="btn btn-primary">
        Add board
      </router-link>
    </div>
    <div class="card-body overflow-scroll">
      <Suspense>
        <board-list />
        <template #fallback> Loading...</template>
      </Suspense>
    </div>
  </article>
</template>

<script lang="ts">
export default {
  name: "BoardAdministration",
};
</script>

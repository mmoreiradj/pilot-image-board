<script setup lang="ts">
import CategoryAdministration from "@/components/admin/CategoryAdministration.vue";
import BoardAdministration from "@/components/admin/BoardAdministration.vue";
import UserAdministration from "@/components/admin/UserAdministration.vue";
</script>

<template>
  <article class="container bg-white vh-100 border-start border-end">
    <h1>Administration</h1>
    <category-administration class="mb-5" />
    <board-administration class="mb-5" />
    <user-administration />
  </article>
</template>

<script lang="ts">
export default {
  name: "AdminView",
};
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  creationDate: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span class="badge ml-2 bg-secondary mt-1">
    Posted on {{ new Date(creationDate).toLocaleDateString() }} at
    {{ new Date(creationDate).toLocaleTimeString() }}
  </span>
</template>

<script lang="ts">
export default {
  name: "PostTimeBadge",
};
</script>

<style scoped></style>

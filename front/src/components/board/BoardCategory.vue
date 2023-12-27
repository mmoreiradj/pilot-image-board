<script setup lang="ts">
import { ref, defineProps } from "vue";
import { categoryService } from "@/services";

const categoryName = ref("");

const props = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

try {
  const response = await categoryService.getCategory(props.categoryId);
  categoryName.value = response.data.name;
} catch (error) {
  categoryName.value = "-";
}
</script>

<template>
  <th>{{ categoryName }}</th>
</template>

<script lang="ts">
export default {
  name: "BoardCategory",
};
</script>

<style scoped></style>

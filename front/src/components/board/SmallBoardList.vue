<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useAlertsStore } from "@/stores";
import { boardService } from "@/services";
import { Board } from "@/models";

const props = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const boards = ref([] as Board[]);

try {
  const response = await boardService.getBoards({
    limit: 10000,
    categoryId: props.categoryId,
  });
  boards.value = response.data.results;
} catch (error) {
  useAlertsStore().addAlert({
    description: "Something went wrong, please try again later",
    type: "error",
    timeout: 5000,
  });
}
</script>

<template>
  <router-link
    v-for="board in boards"
    class="d-block"
    :to="{ name: 'board', params: { boardId: board.id } }"
    :key="board.id"
    v-html="board.title"
  />
</template>

<script lang="ts">
export default {
  name: "SmallBoardList",
};
</script>

<style scoped></style>

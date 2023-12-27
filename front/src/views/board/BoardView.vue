<script setup lang="ts">
import { ref } from "vue";
import { Board } from "@/models";
import { boardService } from "@/services";
import { useRoute, useRouter } from "vue-router";
import { useAlertsStore } from "@/stores";
import ThreadList from "@/components/thread/ThreadList.vue";

// Router and route
const failed = ref(false);
const router = useRouter();
const route = useRoute();

// route params
const boardId = route.params.boardId;

// refs
const board = ref({} as Board);

// logic
if (Number.isNaN(+boardId)) {
  failed.value = true;
  router.replace({
    name: "not-found",
    params: { pathMatch: route.path.substring(1).split("/") },
    query: route.query,
    hash: route.hash,
  });
} else {
  try {
    const response = await boardService.getBoard(+boardId);
    board.value = response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      failed.value = true;
      await router.replace({
        name: "not-found",
        params: { pathMatch: route.path.substring(1).split("/") },
        query: route.query,
        hash: route.hash,
      });
    } else {
      useAlertsStore().addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
      await router.push({
        name: "home",
      });
    }
  }
}
</script>

<template>
  <article class="h-100 min-vh-75 pb-3" v-if="!failed">
    <h1>{{ board.title }}</h1>
    <p>{{ board.description }}</p>
    <router-link :to="{ name: 'home' }" class="btn btn-secondary mb-3 me-3">
      <font-awesome-icon icon="arrow-left" />
      Go home
    </router-link>
    <router-link
      :to="{ name: 'start-thread', params: { boardId: board.id } }"
      class="btn btn-primary mb-3"
    >
      Start a new thread
    </router-link>
    <thread-list :board-id="board.id" :preview="true" />
  </article>
</template>

<script lang="ts">
export default {
  name: "BoardView",
};
</script>

<style scoped></style>

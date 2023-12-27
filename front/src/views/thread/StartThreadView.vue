<script setup lang="ts">
import { useAlertsStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { authService, boardService, threadService } from "@/services";
import { ref } from "vue";
import { Board, Thread } from "@/models";
import ThreadForm from "@/components/thread/ThreadForm.vue";

const router = useRouter();

const boardId = +useRoute().params.boardId;

const board = ref({} as Board);

if (Number.isNaN(boardId)) {
  router.replace({
    name: "not-found",
    params: { pathMatch: useRoute().path.substring(1).split("/") },
    query: useRoute().query,
    hash: useRoute().hash,
  });
} else {
  try {
    const response = await boardService.getBoard(boardId);
    board.value = response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      router.replace({
        name: "not-found",
        params: { pathMatch: useRoute().path.substring(1).split("/") },
        query: useRoute().query,
        hash: useRoute().hash,
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

const onSubmit = async (values: Thread, actions: any) => {
  try {
    const response = await threadService.createThread(values);
    useAlertsStore().addAlert({
      type: "success",
      description: "Thread created successfully",
      timeout: 5000,
    });
    await router.push({
      name: "thread",
      params: { boardId: boardId, threadId: response.data.id },
    });
  } catch (error: any) {
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await onSubmit(values, actions);
      } else {
        await router.push({ name: "signin" });
      }
    } else {
      useAlertsStore().addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
    }
  }
};
</script>

<template>
  <article
    class="min-vh-75 d-flex justify-content-center align-items-center flex-column"
  >
    <h1>Start a new thread in {{ board.title }}</h1>
    <p>{{ board.description }}</p>
    <thread-form @form-submitted="onSubmit" :boardId="board.id" />
  </article>
</template>

<script lang="ts">
export default {
  name: "StartThreadView",
};
</script>

<style scoped></style>

<script setup lang="ts">
import BoardForm from "@/components/admin/BoardForm.vue";
import { useRoute, useRouter } from "vue-router";
import { authService, boardService } from "@/services";
import { Board } from "@/models";
import { ref } from "vue";
import { useAlertsStore } from "@/stores";

const alertsStore = useAlertsStore();

const failed = ref(false);
const board = ref({} as Board);
const route = useRoute();
const router = useRouter();
const boardId = +route.params.boardId;

if (Number.isNaN(boardId)) {
  failed.value = true;
  router.replace({
    name: "not-found",
    params: { pathMatch: route.path.substring(1).split("/") },
    query: route.query,
    hash: route.hash,
  });
} else {
  try {
    const response = await boardService.getBoard(boardId);
    board.value = response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      failed.value = true;
      router.replace({
        name: "not-found",
        params: { pathMatch: route.path.substring(1).split("/") },
        query: route.query,
        hash: route.hash,
      });
    } else {
      alertsStore.addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
      await router.push({
        name: "admin",
      });
    }
  }
}

const onSubmit = async (values: Board, actions: any) => {
  try {
    await boardService.updateBoard(boardId, values);
    alertsStore.addAlert({
      type: "success",
      description: "Board updated successfully",
      timeout: 5000,
    });
    await router.push({
      name: "admin",
    });
  } catch (error: any) {
    if (
      error?.response?.status === 400 &&
      error.response.data.error.code === 2000 &&
      error.response.data.error.field === "title"
    ) {
      actions.setErrors({
        title: "Board with this title already exists",
      });
    } else if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await onSubmit(values, actions);
      } else {
        await router.push({
          name: "signin",
        });
      }
    } else if (error?.response?.status === 403) {
      await router.push({
        name: "home",
      });
    } else {
      alertsStore.addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
      await router.push({
        name: "admin",
      });
    }
  }
};
</script>

<template>
  <article
    v-if="!failed"
    class="bg-white container d-flex flex-column align-items-center justify-content-center border-start border-end"
    style="height: 75vh"
  >
    <div class="d-flex justify-content-start">
      <h1>Update board</h1>
    </div>
    <Suspense>
      <board-form @form-submitted="onSubmit" :board="board" />
      <template #fallback> Loading...</template>
    </Suspense>
  </article>
</template>

<script lang="ts">
export default {
  name: "EditBoardView",
};
</script>

<style scoped></style>

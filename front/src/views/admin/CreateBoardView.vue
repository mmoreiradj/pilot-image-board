<script setup lang="ts">
import BoardForm from "@/components/admin/BoardForm.vue";
import { Board } from "@/models";
import { useRouter } from "vue-router";
import { authService, boardService } from "@/services";
import { useAlertsStore } from "@/stores";

const router = useRouter();
const alertsStore = useAlertsStore();

const onSubmit = async (values: Board, actions: any) => {
  try {
    await boardService.createBoard(values);
    alertsStore.addAlert({
      type: "success",
      description: "Board created successfully",
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
        title: ["A board with this title already exists"],
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
    throw error;
  }
};
</script>

<template>
  <article
    class="bg-white container d-flex flex-column align-items-center justify-content-center border-start border-end"
    style="height: 75vh"
  >
    <div class="d-flex justify-content-start">
      <h1>Create board</h1>
    </div>
    <Suspense>
      <board-form @form-submitted="onSubmit" />
      <template #fallback> Loading...</template>
    </Suspense>
  </article>
</template>

<script lang="ts">
export default {
  name: "CreateBoardView",
};
</script>

<style scoped></style>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Board, Post, Thread } from "@/models";
import { ref } from "vue";
import { useAlertsStore, usePostsStore } from "@/stores";
import {
  boardService,
  threadService,
  postService,
  authService,
} from "@/services";
import ThreadItem from "@/components/thread/ThreadItem.vue";
import { AxiosError } from "axios";

// route and router
const route = useRoute();
const router = useRouter();

// params
const failed = ref(false);
const threadId = Number(route.params.threadId);
const boardId = Number(route.params.boardId);

// data
const board = ref({} as Board);
const thread = ref({} as Thread);

// logic
if (Number.isNaN(threadId) || Number.isNaN(boardId)) {
  failed.value = true;
  router.replace({
    name: "not-found",
    params: { pathMatch: route.path.substring(1).split("/") },
    query: route.query,
    hash: route.hash,
  });
} else {
  try {
    const boardResponse = await boardService.getBoard(boardId);
    const threadResponse = await threadService.getThread(threadId);
    if (threadResponse.data.boardId !== boardResponse.data.id) {
      await router.replace({
        name: "not-found",
        params: { pathMatch: route.path.substring(1).split("/") },
        query: route.query,
        hash: route.hash,
      });
    } else {
      board.value = boardResponse.data;
      thread.value = threadResponse.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      failed.value = true;
      router.replace({
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

const onSubmit = async (values: Post, actions: any) => {
  try {
    const response = await postService.createPost(values);
    actions.setFieldValue("description", "");
    useAlertsStore().addAlert({
      type: "success",
      description: "Post created successfully",
      timeout: 5000,
    });
    usePostsStore().addPosts([response.data]);
  } catch (error: any | AxiosError) {
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await onSubmit(values, actions);
      } else {
        await router.push({
          name: "signin",
        });
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
  <article class="min-vh-75 h-100 pb-3" v-if="!failed">
    <h1>{{ board.title }}</h1>
    <p>{{ board.description }}</p>
    <router-link
      :to="{ name: 'board', params: { boardId: thread.boardId } }"
      class="btn btn-secondary mb-3"
    >
      <font-awesome-icon icon="arrow-left" />
      Go back
    </router-link>
    <router-link
      :to="{
        name: 'post',
        params: { boardId: thread.boardId, threadId: thread.id },
      }"
      class="btn btn-primary mb-3 ms-2"
    >
      Post an answer
    </router-link>
    <thread-item :thread="thread" />
    <router-link
      :to="{
        name: 'post',
        params: { boardId: thread.boardId, threadId: thread.id },
      }"
      class="btn btn-primary mb-3 ms-2"
    >
      Post an answer
    </router-link>
  </article>
</template>

<script lang="ts">
export default {
  name: "ThreadView",
};
</script>

<style scoped></style>

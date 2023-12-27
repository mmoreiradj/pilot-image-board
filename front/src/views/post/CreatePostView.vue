<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Board, Post, Thread } from "@/models";
import { ref } from "vue";
import { useAlertsStore } from "@/stores";
import {
  boardService,
  threadService,
  postService,
  authService,
  imageService,
} from "@/services";
import PostForm from "@/components/post/PostForm.vue";

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
const file = ref<File | null>(null);
const fileName = ref<string | null>(null);
const fileError = ref<string | null>(null);

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

const handleFileChange = async (e: any) => {
  try {
    fileError.value = null;
    const file = e?.target?.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await imageService.postImage(formData);
    fileName.value = response.data.file_id;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      fileError.value = "Make sure the file is an image and is less than 5MB";
    }
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await handleFileChange(e);
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

const handlePostSubmit = async (post: Post, actions: never) => {
  try {
    const data = {
      ...post,
      threadId: thread.value.id,
    };
    if (fileName.value) {
      data.image = fileName.value;
    }
    await postService.createPost(data);
    await router.push({
      name: "thread",
      params: {
        boardId: board.value.id,
        threadId: thread.value.id,
      },
    });
  } catch (error: any) {
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await handlePostSubmit(post, actions);
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
  <article
    class="min-vh-75 d-flex justify-content-center align-items-center flex-column"
  >
    <h1>Board : {{ board.title }}</h1>
    <p>{{ board.description }}</p>
    <h2>Post a reply to Thread {{ thread.title }}</h2>
    <p>{{ thread.description }}</p>
    <form style="max-width: 500px; width: 100%">
      <div class="mb-3">
        <label for="formFile" class="form-label"> Image </label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="handleFileChange"
        />
        <div v-if="fileError" class="form-text text-danger">
          {{ fileError }}
        </div>
      </div>
    </form>
    <post-form
      :boardId="board.id"
      :threadId="thread.id"
      @form-submitted="handlePostSubmit"
    />
  </article>
</template>

<script lang="ts">
export default {
  name: "CreatePostView",
};
</script>

<style scoped></style>

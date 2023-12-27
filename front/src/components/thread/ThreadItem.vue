<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { Post, Thread } from "@/models";
import CardComponent from "@/components/common/CardComponent.vue";
import AuthorBadge from "@/components/common/AuthorBadge.vue";
import PostList from "@/components/post/PostList.vue";
import PostTimeBadge from "@/components/common/PostTimeBadge.vue";
import { useAlertsStore, usePostsStore, useUserStore } from "@/stores";
import { authService, postService, threadService } from "@/services";
import { useRouter } from "vue-router";
import CustomModal from "@/components/common/CustomModal.vue";

const router = useRouter();

const emit = defineEmits(["delete"]);

const showDeleteModal = ref(false);
const showDeleteModalPost = ref(false);
const selectedThread = ref(null as Thread | null);
const selectedPost = ref(null as Post | null);

const props = defineProps({
  thread: {
    type: Object as () => Thread,
    required: true,
  },
  preview: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const onClickDeleteButton = async (thread = {} as Thread, del = false) => {
  if (props.preview) {
    emit("delete", thread);
  } else {
    if (!del) {
      showDeleteModal.value = true;
      selectedThread.value = thread;
      return;
    }
    try {
      if (!selectedThread.value?.id) {
        useAlertsStore().addAlert({
          type: "error",
          description: "Something went wrong... Try again later",
          timeout: 5000,
        });
        return;
      }
      await threadService.deleteThread(selectedThread.value.id);
      useAlertsStore().addAlert({
        type: "success",
        description: "Thread deleted successfully",
        timeout: 5000,
      });
      await router.push({
        name: "board",
        params: { boardId: props.thread.boardId },
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        if (await authService.refresh()) {
          await onClickDeleteButton(thread);
        }
      }
      useAlertsStore().addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
    }
  }
};

const onDeletePost = async (post = {} as Post, del = false) => {
  if (!del) {
    showDeleteModalPost.value = true;
    selectedPost.value = post;
    return;
  }
  try {
    if (!selectedPost.value?.id) {
      useAlertsStore().addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
      return;
    }
    await postService.deletePost(selectedPost.value.id);
    useAlertsStore().addAlert({
      type: "success",
      description: "Post deleted successfully",
      timeout: 5000,
    });
    usePostsStore().removePost(selectedPost.value.id);
    closeDeleteModalPost();
  } catch (error: any) {
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await onDeletePost(post);
      }
    }
    useAlertsStore().addAlert({
      type: "error",
      description: "Something went wrong... Try again later",
      timeout: 5000,
    });
  }
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedThread.value = null;
  selectedPost.value = null;
};

const closeDeleteModalPost = () => {
  showDeleteModalPost.value = false;
  selectedThread.value = null;
  selectedPost.value = null;
};
</script>

<template>
  <card-component class="mb-3">
    <template #header>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row justify-content-between mb-1">
          <h2>{{ thread.title }}</h2>
          <div>
            <button
              class="btn btn-danger me-2"
              @click="onClickDeleteButton(thread)"
              v-if="
                useUserStore().is('admin') ||
                useUserStore().is('moderator') ||
                thread.creatorId === useUserStore().user?.id
              "
            >
              Delete Thread
            </button>
            <router-link
              v-if="preview"
              :to="{
                name: 'thread',
                params: { boardId: thread.boardId, threadId: thread.id },
              }"
              class="btn btn-primary"
              style="height: fit-content"
            >
              See more
              <font-awesome-icon icon="arrow-right" />
            </router-link>
          </div>
        </div>
        <div class="d-flex flex-row flex-wrap align-items-baseline">
          <author-badge :authorId="thread.creatorId" class="me-2 mb-1" />
          <post-time-badge :creation-date="thread.createdAt" />
        </div>
      </div>
    </template>
    <template #body>
      <p>{{ thread.description }}</p>
      <post-list
        :thread-id="thread.id"
        :preview="preview"
        @delete="onDeletePost"
      />
    </template>
  </card-component>
  <custom-modal v-model="showDeleteModal">
    <template #title>
      <h3>Delete thread</h3>
    </template>
    <p>Are you sure you want to delete this thread?</p>
    <template #footer>
      <button class="btn btn-secondary" @click="closeDeleteModal">
        <font-awesome-icon icon="arrow-left" />
        Cancel
      </button>
      <button class="btn btn-danger" @click="onClickDeleteButton({}, true)">
        Delete
      </button>
    </template>
  </custom-modal>
  <custom-modal v-model="showDeleteModalPost">
    <template #title>
      <h3>Delete post</h3>
    </template>
    <p>Are you sure you want to delete this post?</p>
    <template #footer>
      <button class="btn btn-secondary" @click="closeDeleteModalPost">
        <font-awesome-icon icon="arrow-left" />
        Cancel
      </button>
      <button class="btn btn-danger" @click="onDeletePost({}, true)">
        Delete
      </button>
    </template>
  </custom-modal>
</template>

<script lang="ts">
export default {
  name: "ThreadItem",
};
</script>

<style scoped></style>

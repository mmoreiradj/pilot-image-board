<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useAlertsStore, usePostsStore, useUserStore } from "@/stores";
import CardComponent from "@/components/common/CardComponent.vue";
import { API_BASE_URL, postService } from "@/services";
import AuthorBadge from "@/components/common/AuthorBadge.vue";
import PostTimeBadge from "@/components/common/PostTimeBadge.vue";
import { Post } from "@/models";

const emit = defineEmits(["delete"]);

const postsStore = usePostsStore();
const userStore = useUserStore();

// props
const props = defineProps({
  threadId: {
    type: Number,
    required: true,
  },
  preview: {
    type: Boolean,
    required: false,
  },
});

// refs
const loading = ref(false);
const offset = ref(0);
let limit: number;

if (props.preview) {
  limit = 4;
} else {
  limit = 10000;
  usePostsStore().resetPosts();
}

// logic
const loadMore = async () => {
  try {
    loading.value = true;
    const response = await postService.getPosts({
      limit: limit,
      offset: offset.value,
      threadId: props.threadId,
    });
    if (props.preview) {
      postsStore.posts = response.data.results;
    } else {
      postsStore.addPosts(response.data.results);
    }
    offset.value = offset.value + 10;
    loading.value = false;
  } catch (error: any) {
    useAlertsStore().addAlert({
      type: "error",
      description: "Something went wrong... Try again later",
      timeout: 5000,
    });
    loading.value = false;
  }
};

await loadMore();

if (!props.preview) {
  setTimeout(() => {
    loadMore();
  }, 15000);
}

const deletePost = (post: Post) => {
  emit("delete", post);
};
</script>

<template>
  <card-component class="mb-3" v-for="post in postsStore.posts" :key="post.id">
    <template #header>
      <div class="d-flex flex-row flex-wrap align-items-baseline">
        <author-badge :author-id="post.creatorId" class="me-2 mb-1" />
        <post-time-badge :creation-date="post.createdAt" class="me-2 mb-1" />
        <button
          v-if="
            !preview &&
            (userStore.is('admin') ||
              userStore.is('moderator') ||
              (userStore.isConnected() && userStore.user.id === post.creatorId))
          "
          class="btn badge bg-danger"
          @click="deletePost(post)"
        >
          Delete post
        </button>
      </div>
    </template>
    <template #body>
      <div class="d-flex flex-column">
        <div v-if="post.image" class="mb-3">
          <img
            :src="API_BASE_URL + '/images/' + post.image"
            class="img-fluid"
            alt="post image"
            style="width: auto; height: 300px"
          />
        </div>
        <div v-html="post.description" />
      </div>
    </template>
  </card-component>
</template>

<script lang="ts">
export default {
  name: "PostList",
};
</script>

<style scoped></style>

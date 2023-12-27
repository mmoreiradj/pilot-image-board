<script setup lang="ts">
import { ref, defineProps } from "vue";
import { Thread } from "@/models";
import { authService, threadService } from "@/services";
import { useAlertsStore, useUserStore } from "@/stores";
import LoadingComponent from "@/App.vue";
import ThreadItem from "@/components/thread/ThreadItem.vue";
import CustomModal from "@/components/common/CustomModal.vue";

// props
const props = defineProps({
  boardId: {
    type: Number,
    required: true,
  },
  preview: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// refs
const threads = ref([] as Thread[]);
const loading = ref(false);
const offset = ref(0);
const limit = 10;
const showDeleteModal = ref(false);
const selectedThread = ref(null as Thread | null);

// logic
const loadMore = async () => {
  try {
    loading.value = true;
    const response = await threadService.getThreads({
      limit: limit,
      offset: offset.value,
      boardId: props.boardId,
    });
    response.data.results.forEach((result: Thread) => {
      if (!threads.value.some((thread: Thread) => thread.id === result.id)) {
        threads.value.push(result);
      }
    });
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

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedThread.value = null;
};

const handleDelete = async (item = {} as Thread, del = false) => {
  if (del && selectedThread.value?.id) {
    try {
      await threadService.deleteThread(selectedThread.value.id);
      threads.value = threads.value.filter(
        (thread) => thread.id !== selectedThread.value?.id
      );
      selectedThread.value = null;
      closeDeleteModal();
      useAlertsStore().addAlert({
        type: "success",
        description: "Thread deleted successfully",
        timeout: 5000,
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        if (await authService.refresh()) {
          await handleDelete(item, del);
        }
      } else {
        useAlertsStore().addAlert({
          type: "error",
          description: "Something went wrong... Try again later",
          timeout: 5000,
        });
      }
    }
  } else {
    showDeleteModal.value = true;
    selectedThread.value = item;
  }
};
</script>

<template>
  <thread-item
    :thread="thread"
    v-for="thread in threads"
    :key="thread.id"
    :preview="true"
    @delete="handleDelete"
  />
  <infinite-loading @infinite="loadMore" />
  <loading-component v-if="loading" />
  <custom-modal
    v-model="showDeleteModal"
    v-if="useUserStore().is('admin') || useUserStore().is('moderator')"
  >
    <template #title>
      <h3>Delete Board</h3>
    </template>
    <p>Are you sure you want to delete this thread?</p>
    <template #footer>
      <button class="btn btn-secondary" @click="closeDeleteModal">
        <font-awesome-icon icon="arrow-left" />
        Cancel
      </button>
      <button class="btn btn-danger" @click="handleDelete({}, true)">
        Delete
      </button>
    </template>
  </custom-modal>
</template>

<script lang="ts">
export default {
  name: "ThreadList",
};
</script>

<style scoped></style>

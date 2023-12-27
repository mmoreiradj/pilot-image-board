<script setup lang="ts">
import { boardService, categoryService } from "@/services";
import { useAlertsStore } from "@/stores";
import CustomModal from "@/components/common/CustomModal.vue";
import { ref } from "vue";
import { Board } from "@/models";
import BoardCategory from "@/components/board/BoardCategory.vue";

const alertsStore = useAlertsStore();

const showDeleteModal = ref(false);
const selectedBoard = ref(null as number | null);

const boards = ref([] as Board[]);

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedBoard.value = null;
};

const openDeleteModal = (boardId: number) => {
  selectedBoard.value = boardId;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  try {
    if (selectedBoard.value) {
      await boardService.deleteBoard(selectedBoard.value);
      alertsStore.addAlert({
        type: "success",
        description: "Board deleted successfully",
        timeout: 5000,
      });
      boards.value = boards.value.filter(
        (board) => board.id !== selectedBoard.value
      );
      closeDeleteModal();
    }
  } catch (error) {
    alertsStore.addAlert({
      type: "error",
      description: "Error deleting board, refresh page and try again",
      timeout: 5000,
    });
  }
};

try {
  const response = await boardService.getBoards({
    limit: 100000,
  });
  boards.value = response.data.results;
} catch (error) {
  alertsStore.addAlert({
    type: "error",
    description: "Error fetching boards",
    timeout: 5000,
  });
}

const getBoardCategoryName = async (categoryId: number) => {
  try {
    const response = await categoryService.getCategory(categoryId);
    return response.data.name;
  } catch (error) {
    alertsStore.addAlert({
      type: "error",
      description: "Error fetching board category",
      timeout: 5000,
    });
  }
};
</script>

<template>
  <table class="table table-hover table-responsive table-striped">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Category</th>
        <th scope="col">Created</th>
        <th scope="col">Last updated</th>
        <th scope="colgroup">Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="boards.length > 0">
        <tr v-for="board in boards" :key="board.id">
          <th v-html="board.title"></th>
          <td class="text-wrap" v-html="board.description"></td>
          <Suspense>
            <board-category :category-id="board.categoryId" />
            <template #fallback>
              <th>-</th>
            </template>
          </Suspense>
          <td v-html="new Date(board.createdAt).toLocaleDateString()"></td>
          <td v-html="new Date(board.updatedAt).toLocaleDateString()"></td>
          <td class="d-flex flex-row">
            <router-link
              :to="{ name: 'edit-board', params: { boardId: board.id } }"
              class="btn btn-success me-2 d-flex align-items-center"
              :value="board.id"
            >
              Edit
            </router-link>
            <button
              class="btn btn-danger me-2"
              @click="openDeleteModal(board.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="6" class="text-center">No boards yet</td>
      </tr>
    </tbody>
  </table>
  <custom-modal v-model="showDeleteModal">
    <template #title>
      <h3>Delete Board</h3>
    </template>
    <p>Are you sure you want to delete this board?</p>
    <template #footer>
      <button class="btn btn-secondary" @click="closeDeleteModal">
        <font-awesome-icon icon="arrow-left" />
        Cancel
      </button>
      <button class="btn btn-danger" @click="handleDelete">Delete</button>
    </template>
  </custom-modal>
</template>

<script lang="ts">
export default {
  name: "BoardTable",
};
</script>

<style scoped></style>

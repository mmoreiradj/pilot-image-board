<script setup lang="ts">
import { defineEmits } from "vue";

defineEmits(["close", "confirm"]);
</script>

<template>
  <Teleport to="#modals">
    <vue-final-modal
      v-slot="{ params, close }"
      v-bind="$attrs"
      name="create-category"
      classes="d-flex justify-content-center align-items-center"
    >
      <div class="modal-dialog-centered">
        <div class="modal-content d-flex flex-column modal">
          <div class="modal-header">
            <span class="modal-title">
              <slot name="title"></slot>
            </span>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <slot :params="params"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-secondary" @click="close">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="confirm">
                Confirm
              </button>
            </slot>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </Teleport>
</template>

<script lang="ts">
export default {
  name: "CustomModal",
};
</script>

<style scoped></style>

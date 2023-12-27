<script setup lang="ts">
import { defineProps, ref } from "vue";
import { userService } from "@/services";
import { User } from "@/models";
import { useAlertsStore } from "@/stores";

const props = defineProps({
  authorId: {
    type: Number,
    required: true,
  },
});

const user = ref({} as User);

try {
  const response = await userService.getUser(props.authorId);
  user.value = response.data;
} catch (error) {
  useAlertsStore().addAlert({
    type: "error",
    description: "Something went wrong... Try again later",
    timeout: 5000,
  });
}
</script>

<template>
  <span class="badge bg-secondary">
    Posted by {{ user?.username ?? "Unknown" }}
  </span>
</template>

<script lang="ts">
export default {
  name: "AuthorBadge",
};
</script>

<script setup lang="ts">
import { useAlertsStore } from "@/stores";

const alertsStore = useAlertsStore();

const alertColor = (type: string) => {
  switch (type) {
    case "success":
      return "alert-primary";
    case "error":
      return "alert-danger";
    default:
      return "";
  }
};

const alertIcon = (type: string) => {
  switch (type) {
    case "success":
      return "check-square";
    case "error":
      return "circle-exclamation";
    default:
      return "";
  }
};
</script>

<template>
  <div class="fixed-bottom d-flex flex-column">
    <div
      v-for="(alert, index) in alertsStore.alerts"
      class="alert d-flex align-items-center mb-0"
      role="alert"
      :class="alertColor(alert.type)"
      :key="index"
    >
      <font-awesome-icon :icon="alertIcon(alert.type)" size="lg" class="me-2" />
      <div>
        {{ alert.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppAlerts",
};
</script>

<style scoped></style>

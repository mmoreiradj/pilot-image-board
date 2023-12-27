<template>
  <div class="bg-light">
    <app-header />
    <div class="container bg-white border-end border-start mb-0">
      <Suspense>
        <router-view />
        <template #fallback>
          <loading-component />
        </template>
      </Suspense>
    </div>
    <app-footer />
  </div>
  <app-alerts />
</template>

<script setup>
import AppHeader from "@/components/common/AppHeader";
import AppAlerts from "@/components/common/AppAlerts";
import LoadingComponent from "@/components/common/LoadingComponent.vue";
import AppFooter from "@/components/common/AppFooter.vue";
</script>

<script setup lang="ts">
import CardComponent from "@/components/common/CardComponent.vue";
import LoadingComponent from "@/components/common/LoadingComponent.vue";
import CategoryList from "@/components/category/CategoryList.vue";
</script>

<template>
  <article class="vh-100">
    <h1>Home</h1>
    <card-component>
      <template #header>
        <h2>Boards</h2>
      </template>
      <template #body>
        <Suspense>
          <category-list />
          <template #fallback>
            <loading-component />
          </template>
        </Suspense>
      </template>
    </card-component>
  </article>
</template>

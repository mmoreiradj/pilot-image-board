<template>
  <article class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </article>
</template>

<script lang="ts">
export default {
  name: "CardComponent",
};
</script>

<style scoped></style>

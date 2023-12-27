<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
const userStore = useUserStore();

const router = useRouter();

const onLogout = async () => {
  userStore.emptyUser();
  await router.push({ name: "home" });
};
</script>

<template>
  <nav
    class="d-flex flex-column align-items-center border-bottom pb-2 bg-white"
  >
    <router-link :to="{ name: 'home' }">
      <picture>
        <source
          media="(max-width:650px)"
          :srcset="require('@/assets/images/pilot-logo-small.png')"
        />
        <img
          :src="require('@/assets/images/pilot-logo-large.png')"
          alt="app-logo"
          class="pilot-logo"
        />
      </picture>
    </router-link>
    <div class="mt-1" v-if="!userStore.user.id">
      <router-link class="btn btn-primary me-2" :to="{ name: 'signup' }">
        Sign up
      </router-link>
      <router-link class="btn btn-primary ms-2" :to="{ name: 'signin' }">
        Sign in
      </router-link>
    </div>
    <div v-else class="mt-1">
      <button class="btn btn-danger" @click="onLogout">Log out</button>
      <router-link
        :to="{ name: 'admin' }"
        v-if="userStore.user.roles.includes('admin')"
        class="btn btn-primary ms-2"
      >
        Administration
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
};
</script>

<style scoped></style>

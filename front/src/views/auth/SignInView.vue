<script setup lang="ts">
import SignInForm from "@/components/auth/SignInForm";
import { authService, refreshApiService } from "@/services";
import { useAlertsStore } from "@/stores";
import { useRouter } from "vue-router";
import { User } from "@/models";

const alertStore = useAlertsStore();
const router = useRouter();

const onSubmit = async (values: User, actions: any) => {
  try {
    const response = await authService.signIn(values);

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    refreshApiService();

    await router.push({
      name: "home",
    });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      actions.setErrors({
        username: ["Invalid credentials"],
        password: ["Invalid credentials"],
      });
    } else {
      alertStore.addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
      actions.resetForm();
    }
  }
};
</script>

<script lang="ts">
export default {
  name: "SignInView",
};
</script>

<template>
  <sign-in-form @submit="onSubmit" />
</template>

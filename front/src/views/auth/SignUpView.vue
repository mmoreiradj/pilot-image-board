<script setup lang="ts">
import SignUpForm from "@/components/auth/SignUpForm.vue";
import { useRouter } from "vue-router";
import { useAlertsStore } from "@/stores";
import { User } from "@/models";
import { authService } from "@/services";

const alertStore = useAlertsStore();
const router = useRouter();

const onSubmit = async (values: User, actions: any) => {
  try {
    await authService.signUp({
      username: values.username,
      password: values.password,
    });

    alertStore.addAlert({
      description: "Your account has been created you may now sign in",
      timeout: 5000,
      type: "success",
    });

    await router.push({
      name: "signin",
    });
  } catch (error: any) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.error.code === 2000 &&
      error.response.data.error.field === "username"
    ) {
      actions.setErrors({
        username: ["Username is already taken"],
      });
    } else {
      alertStore.addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
    }
  }
};
</script>

<template>
  <sign-up-form @submit="onSubmit" />
</template>

<script lang="ts">
export default {
  name: "SignUpView",
};
</script>

<style scoped></style>

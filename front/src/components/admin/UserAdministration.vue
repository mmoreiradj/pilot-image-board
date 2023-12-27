<script setup lang="ts">
import Typeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import CardComponent from "@/components/common/CardComponent.vue";
import { computed, ref } from "vue";
import { authService, roleService, userService } from "@/services";
import { useRouter } from "vue-router";
import { useAlertsStore } from "@/stores";
import { Form, Field } from "vee-validate";
import { yupUserRoleSchema } from "@/schemas";
import { User } from "@/models";

const alertsStore = useAlertsStore();

const router = useRouter();

const roles = ref([] as number[]);
const users = ref([] as User[]);
const selectedUser = ref({} as User);
const errorMessage = ref("");

const handleUpdate = async (username: string) => {
  try {
    errorMessage.value = "";
    if (username.length < 4) return;
    const response = await userService.getUsers({
      limit: 10,
      username,
    });
    users.value = response.data.results;
  } catch (error) {
    useAlertsStore().addAlert({
      type: "error",
      description: "Something went wrong... Try again later",
      timeout: 5000,
    });
  }
};

const handleSelect = (user: User) => {
  selectedUser.value = user;
};

const usersProjection = (item: any) => {
  return item.username;
};

const userRoleSchema = computed(() => {
  return yupUserRoleSchema;
});

const handleSubmit = async (values: any, actions: any) => {
  errorMessage.value = "";
  try {
    if (!selectedUser.value?.id) return;
    if (values.action === "add") {
      await roleService.addRoleToUser(selectedUser.value.id, values.roleId);
      alertsStore.addAlert({
        type: "success",
        description: "Role successfully added",
        timeout: 5000,
      });
    } else {
      const response = await roleService.removeRoleFromUser(
        selectedUser.value.id,
        values.roleId
      );
      if (response.status === 404) {
        errorMessage.value = "User does not have this role";
      } else {
        alertsStore.addAlert({
          type: "success",
          description: "Role successfully added",
          timeout: 5000,
        });
      }
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        handleSubmit(values, actions);
      } else {
        await router.push({ name: "signin" });
      }
    } else if (error?.response?.status === 400) {
      errorMessage.value = "User already has that role !";
    } else {
      alertsStore.addAlert({
        type: "error",
        description: "Something went wrong... Try again later",
        timeout: 5000,
      });
    }
  }
};

const initRoles = async () => {
  let response;
  try {
    response = await roleService.getRoles();
    roles.value = response.data.results;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      if (await authService.refresh()) {
        await initRoles();
      } else {
        await router.push({ name: "signin" });
      }
    } else {
      useAlertsStore().addAlert({
        type: "error",
        description: "Something went wrong... Please try again later.",
        timeout: 5000,
      });
    }
  }
};
initRoles();
</script>

<template>
  <card-component>
    <template #header>
      <h2>Users</h2>
    </template>
    <template #body>
      <Form
        as="form"
        class="d-flex flex-row align-items-center justify-content-center flex-wrap"
        :validation-schema="userRoleSchema"
        @submit="handleSubmit"
      >
        <Field
          as="select"
          name="action"
          class="form-select w-auto me-2"
          @change="errorMessage = ''"
        >
          <option value="" selected disabled hidden>Action</option>
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </Field>
        <span class="me-2">Role</span>
        <Field
          as="select"
          name="roleId"
          class="form-select w-auto me-2"
          @change="errorMessage = ''"
        >
          <option value="" selected disabled hidden>role to add/remove</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </Field>
        <span class="me-2">To/From</span>
        <div class="me-2">
          <typeahead
            class="form-control"
            :items="users"
            placeholder="Search for a user"
            :itemProjection="usersProjection"
            @onInput="handleUpdate"
            @selectItem="handleSelect"
          />
        </div>
        <button class="btn btn-primary">Done</button>
      </Form>
      <div class="d-flex justify-content-center">
        <p class="text-danger">{{ errorMessage }}</p>
      </div>
    </template>
  </card-component>
</template>

<style scoped></style>

<script lang="ts" setup>
import UserRow from "@/components/UserRow.vue";
import { useUsersStore } from "@/stores/app";
import type { IUser } from "@/types/user.types";

const userStore = useUsersStore();

const addEmptyUser = () => {
  const emptyUser: IUser = {
    id: userStore.userCounter,
    markers: [],
    type: "Локальная",
    login: "",
    password: "",
    save: false,
  };

  userStore.addUser(emptyUser);
  console.log(emptyUser);
};
</script>

<template>
  <div class="d-flex flex-column align-start v-container">
    <v-sheet class="px-4 my-2 w-100">
      <span class="text-center">Учетные записи</span>
      <v-icon-btn
        variant="text"
        icon="mdi-plus"
        class="my-2"
        @click="addEmptyUser"
      ></v-icon-btn>
    </v-sheet>

    <div class="ma-2">
      <v-icon icon="mdi-help" />
      <p class="d-inline">
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </p>
    </div>

    <v-container class="bg-surface-variant mb-6">
      <v-row no-gutters class="">
        <v-col class="pa-2">
          <span>Метки</span>
        </v-col>
        <v-col class="pa-2">
          <span>Тип записи</span>
        </v-col>
        <v-col class="pa-2">
          <span>Логин</span>
        </v-col>
        <v-col class="pa-2">
          <span>Пароль</span>
        </v-col class="pa-2">
        <v-col class="pa-2" cols="auto"></v-col>
      </v-row>
      <UserRow
        no-gutters
        v-for="user in userStore.users"
        :key="user.id"
        :user="user"
      />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import TableRow from "@/components/UserRow.vue";
import { useUsersStore } from "@/stores/app";
import type { IUser } from "@/types/user.types";

const userStore = useUsersStore();

const addEmptyUser = () => {
  const emptyUser: IUser = {
    id: userStore.userCounter,
    markers: "",
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

    <!-- <v-table theme="dark" class="w-100">
      <thead>
        <tr>
          <th class="text-left">Метки</th>
          <th class="text-left">Тип записи</th>
          <th class="text-left">Логин</th>
          <th class="text-left">Пароль</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="user in userStore.users" :key="user.id" :user="user" />
      </tbody>
    </v-table> -->

    <v-container class="bg-surface-variant mb-6">
      <v-row align="start" no-gutters>
        <v-col>
          <v-text-field label="Метки"></v-text-field>
        </v-col>
        <v-col>
          <v-select
            label="Тип записи"
            :items="['Локальная', 'LDAP']"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field label="Логин"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Пароль"></v-text-field>
        </v-col>
        <v-col> </v-col>
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

<script lang="ts" setup>
import { useUsersStore } from "@/stores/app";
import type { IUser } from "@/types/user.types";

const { users, userCounter, addUser, removeUser } = useUsersStore();

const addEmptyUser = () => {
  const emptyUser: IUser = {
    id: userCounter,
    markers: "",
    type: "Локальная",
    login: "",
    password: "",
  };

  addUser(emptyUser);
  console.log(userCounter);
};
</script>

<template>
  <div class="d-flex flex-column align-center v-container">
    <v-sheet class="px-4 my-4 w-100">
      <span class="text-center">Учетные записи</span>
      <v-icon-btn
        variant="text"
        icon="mdi-plus"
        class="my-2"
        @click="addEmptyUser"
      ></v-icon-btn>
    </v-sheet>

    <v-table theme="dark" class="w-100">
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
        <tr v-for="user in users" :key="user.id">
          <td>
            <v-text-field label="Метки" v-model="user.markers"></v-text-field>
          </td>
          <td>
            <v-select
              label="Тип записи"
              :items="['Локальная', 'LDAP']"
              v-model="user.type"
            ></v-select>
          </td>
          <td :colspan="user.type === 'LDAP' ? 1 : 2">
            <v-text-field label="Логин" v-model="user.login"></v-text-field>
          </td>
          <td v-show="user.type !== 'LDAP'">
            <v-text-field label="Пароль" v-model="user.password"></v-text-field>
          </td>
          <td width="25">
            <v-icon-btn
              variant="text"
              icon="mdi-trash-can"
              @click="removeUser(user.id)"
            ></v-icon-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

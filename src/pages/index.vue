<script lang="ts" setup>
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

const rules = {
  required: (value: string) => !!value || "Обязательное поле.",
  counter: (value: string) => value.length >= 2 || "Минимально 2 символа",
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
        <tr
          v-for="user in userStore.users"
          :key="user.id"
          height="100"
          :class="[user?.save ? 'bg-dark' : 'bg-warning']"
        >
          <td>
            <v-text-field
              :rules="[rules.required, rules.counter]"
              label="Метки"
              maxlength="50"
              v-model="user.markers"
              :hasError="user.save"
            ></v-text-field>
          </td>
          <td width="300">
            <v-select
              label="Тип записи"
              :items="['Локальная', 'LDAP']"
              v-model="user.type"
            ></v-select>
          </td>
          <td :colspan="user.type === 'LDAP' ? 2 : 1">
            <v-text-field
              :rules="[rules.required, rules.counter]"
              label="Логин"
              maxlength="100"
              v-model="user.login"
            ></v-text-field>
          </td>
          <td v-show="user.type !== 'LDAP'">
            <v-text-field
              :rules="[rules.required, rules.counter]"
              label="Пароль"
              type="password"
              maxlength="100"
              v-model="user.password"
            ></v-text-field>
          </td>
          <td width="25">
            <v-icon-btn
              variant="text"
              icon="mdi-trash-can"
              @click="userStore.removeUser(user.id)"
            ></v-icon-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

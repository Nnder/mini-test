<script lang="ts" setup></script>

<template>
  <div class="d-flex flex-column align-center v-container">
    <v-sheet class="px-4 my-4 w-100">
      <span class="text-center">Учетные записи</span>
      <v-icon-btn variant="text" icon="mdi-plus" class="my-2"></v-icon-btn>
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
        <tr v-for="n in 3" :key="n">
          <td><v-text-field label="Метки"></v-text-field></td>
          <td>
            <v-select
              label="Тип записи"
              :items="['Локальная', 'LDAP']"
            ></v-select>
          </td>
          <td :colspan="n < 2 ? 1 : 2">
            <v-text-field label="Логин"></v-text-field>
          </td>
          <td v-if="n < 2">
            <v-text-field label="Пароль"></v-text-field>
          </td>
          <td width="25">
            <v-icon-btn variant="text" icon="mdi-trash-can"></v-icon-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
//
</script>

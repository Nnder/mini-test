<script lang="ts" setup></script>

<template>
  <div>
    <div>
      <span>Учетные записи</span>
      <v-icon-btn variant="text" icon="mdi-close"></v-icon-btn>
    </div>

    <div>
      <v-container class="bg-surface-variant mb-6">
        <v-row align="start" no-gutters v-for="n in 3" :key="n">
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
          <v-col>
            <v-icon-btn variant="text" icon="mdi-trash-can"></v-icon-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
//
</script>

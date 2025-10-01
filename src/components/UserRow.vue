<script lang="ts" setup>
import { useUsersStore } from "@/stores/app";

const userStore = useUsersStore();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const rules = {
  required: (value: string) => !!value || "Обязательное поле.",
  counter: (value: string) => value.length >= 2 || "Минимально 2 символа",
};

const rowForm = ref();

const validateRow = async () => {
  const result = await rowForm.value?.validate();
  props.user.save = result.valid;
  if (result.valid) {
    userStore.save();
  }
};

const markersText = computed({
  get: () => (props.user.markers || []).join(";"),
  set: (val: string) => {
    props.user.markers = val
      .split(";")
      .map((m) => m.trim())
      .filter((m) => m.length > 0);
  },
});
</script>

<template>
  <v-form ref="rowForm">
    <v-row height="100" :class="[user?.save ? 'bg-dark' : 'bg-secondary']">
      <v-col :cols="3">
        <v-text-field
          :rules="[rules.required, rules.counter]"
          label="Метки"
          maxlength="50"
          v-model="markersText"
          @blur="validateRow"
        ></v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-select
          label="Тип записи"
          :items="['Локальная', 'LDAP']"
          v-model="user.type"
          @blur="
            (event: FocusEvent) => {
              validateRow();
              const input = event.target as HTMLInputElement;
              input.value === 'LDAP'
                ? (user.password = null)
                : (user.password = '');
            }
          "
        ></v-select>
      </v-col>
      <v-col :cols="user.type === 'LDAP' ? 6 : 3">
        <v-text-field
          :rules="[rules.required, rules.counter]"
          label="Логин"
          maxlength="100"
          v-model="user.login"
          @blur="validateRow"
        ></v-text-field>
      </v-col>
      <v-col v-if="user.type !== 'LDAP'" :cols="3">
        <v-text-field
          :rules="[rules.required, rules.counter]"
          label="Пароль"
          type="password"
          maxlength="100"
          v-model="user.password"
          @blur="validateRow"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-icon-btn
          variant="text"
          icon="mdi-trash-can"
          @click="userStore.removeUser(user.id)"
        ></v-icon-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

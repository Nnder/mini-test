// Utilities
import type { IUser } from "@/types/user.types";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const users = ref<IUser[]>([]);
  const userCounter = computed(() => users.value.length);
  const addUser = (userData: IUser) => {
    users.value.push(userData);
  };

  const removeUser = (id: number) => {
    const filteredUsers = users.value.filter((val) => val.id !== id);
    users.value = filteredUsers;
  };

  return { users, userCounter, addUser, removeUser };
});

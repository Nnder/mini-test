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

  const save = () => {
    const validData = users.value.filter((user) => user.save === true);
    localStorage.setItem("users", JSON.stringify(validData));
    console.log(validData, "for save");
  };

  const restoreLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("users"));
    users.value = data;
  };

  restoreLocalStorage();

  return { users, userCounter, addUser, removeUser, save, restoreLocalStorage };
});

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
    const validData = users.value
      .filter((user) => user.save === true)
      .map((user) => ({
        ...user,
        markers: (user.markers || []).join(";"), // преобразуем массив в строку
      }));

    localStorage.setItem("users", JSON.stringify(validData));
    console.log(validData, "Сохраненно");
  };

  const restoreLocalStorage = () => {
    const storage = localStorage.getItem("users");

    if (storage) {
      const data: IUser<string>[] = JSON.parse(storage);
      const result: IUser[] = data.map((user) => ({
        ...user,
        markers: (user.markers || "")
          .split(";")
          .map((m) => m.trim())
          .filter((m) => m.length > 0),
      }));

      users.value = result;
    }
  };

  restoreLocalStorage();

  return { users, userCounter, addUser, removeUser, save, restoreLocalStorage };
});

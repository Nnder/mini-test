export type UserType = "Локальная" | "LDAP";

export interface IUser {
  id: number;
  markers: string;
  type: UserType;
  login: string;
  password?: string;
}

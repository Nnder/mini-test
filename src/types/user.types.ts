export type UserType = "Локальная" | "LDAP";
export type MarkerType = { text: string };

export interface IUser {
  id: number;
  markers: MarkerType[];
  type: UserType;
  login: string;
  password?: string | null;
  save?: boolean;
}

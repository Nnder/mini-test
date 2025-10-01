export type UserType = "Локальная" | "LDAP";

export interface IUser<TMarkers = string[]> {
  id: number;
  markers: TMarkers;
  type: UserType;
  login: string;
  password?: string | null;
  save?: boolean;
}

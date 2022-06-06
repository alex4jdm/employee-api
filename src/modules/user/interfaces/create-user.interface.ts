import { IUser } from "./user.interface";

export interface ICreateUser {
  email: string;
  username: string;
  boss: { id: string};
  password: string;
}
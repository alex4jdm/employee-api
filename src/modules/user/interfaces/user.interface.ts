import { EUserRoles } from "src/common/enums/EUserRoles.enum";

export interface IUser {
  id: string;
  email: string;
  username: string;
  role: EUserRoles;
  boss?: IUser;
  subordinates?: IUser[];
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

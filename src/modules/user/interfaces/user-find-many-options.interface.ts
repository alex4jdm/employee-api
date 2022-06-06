import { IFindManyOptions } from "src/common";

export interface IUserFindManyOptions extends IFindManyOptions {
  orderBy: string;
}

import { IPaginationOptions } from "./IPaginationOptions.interface";

export interface IFindManyOptions extends IPaginationOptions{
  search?: string;
}

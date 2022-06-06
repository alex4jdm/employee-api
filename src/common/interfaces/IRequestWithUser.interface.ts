import { IUser } from 'src/modules/user/interfaces';

export interface IRequestWithUser extends Request {
  user?: IUser;
}

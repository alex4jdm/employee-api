import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUser } from 'src/modules/user/interfaces';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  public serializeUser(user: IUser, done: (err: Error | null, id?: Partial<IUser>) => void): void {
    done(null, user);
  }

  public deserializeUser(user: IUser, done: (err: Error | null, payload?: IUser) => void): void {
    done(null, user);
  }
}

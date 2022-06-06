import * as bcrypt from 'bcrypt';
import { IHashPasswordProvider } from '../interfaces';

export class BcryptProvider implements IHashPasswordProvider {
  public readonly provider: bcrypt;

  constructor(public readonly saltRound: number = 10) {
    this.provider = bcrypt;
  }

  public compare(password: string, hashPassword: string): Promise<boolean> {
    return this.provider.compare(password, hashPassword);
  }

  public hash(password: string): Promise<string> {
    return this.provider.hash(password, +this.saltRound);
  }
}

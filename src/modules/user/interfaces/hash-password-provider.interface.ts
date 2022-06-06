export interface IHashPasswordProvider {
  saltRound: number;

  hash(password: string): Promise<string>;

  compare(password: string, hashPassword: string): Promise<boolean>;
}

import { ISuccessResponse, IPaginationResults } from 'src/common/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SignInDto, SignUpDto } from '../auth/dto';
import { UpdateUserDto, UserPasswordUpdateDto } from './dto';
import {
  FailedToDeleteUserError,
  FailedToUpdateUserAccessError,
  UserAlreadyExistError,
  WrongEmailOrPasswordError,
} from './errors';
import {
  IHashPasswordProvider,
  IUser,
  IUserFindOptions,
  IUserFindManyOptions,
  ICreateUser,
} from './interfaces';
import { HASH_PASSWORD_PROVIDER } from './user.constants';
import { UserRepository } from './user.repository';
import { EUserRoles } from 'src/common';

@Injectable()
export class UserService {
  constructor(
    @Inject(HASH_PASSWORD_PROVIDER)
    private readonly hashPasswordProvider: IHashPasswordProvider,
    private readonly userRepository: UserRepository
  ) {}

  @Transactional()
  public async create(user: ICreateUser): Promise<IUser> {
    try {
      const { email, username, boss, password } = user;

      if (await this.isExist(email)) {
        throw new UserAlreadyExistError();
      }

      const _user = await this.userRepository.insertUser({
        email,
        username,
        boss,
        password: password ? await this.hashPasswordProvider.hash(password) : null,
      });

      return _user;
    } catch (error) {
      throw error;
    }
  }

  public async retrieveUsers(query: IUserFindManyOptions, user: IUser): Promise<IUser[]> {
    if (user.role !== EUserRoles.SUPER_ADMIN) {
      return await this.userRepository.retrieveUsers(query);
    } else {
      return await this.userRepository.retrieveSubordinates(query, user.id);
    }
  }

  @Transactional()
  public async updateUser(userId: string, user: UpdateUserDto, updater: IUser): Promise<IUser> {
    if (updater.role === EUserRoles.SUPER_ADMIN || userId === updater.id || updater.subordinates.find(u => u.id === userId)) {
      return this.userRepository.updateUser({
        id: userId,
        ...user,
      });
    } else {
      throw FailedToUpdateUserAccessError;
    }
  }

  public async updatePassword(id: string, password: UserPasswordUpdateDto['password']): Promise<IUser> {
    return this.userRepository.updateUser({
      id,
      password: await this.hashPasswordProvider.hash(password),
    });
  }

  public async isExist(email: SignUpDto['email']): Promise<boolean> {
    return !!(await this.findByEmail(email));
  }


  @Transactional()
  public async deleteUsers(ids: string[]): Promise<ISuccessResponse> {
    try {
      await this.userRepository.deleteUsers(ids);
    } catch {
      throw new FailedToDeleteUserError();
    }

    return { success: true };
  }

  public async findById(id: string, options?: IUserFindOptions): Promise<IUser | undefined> {
    return this.userRepository.findById(id, options);
  }

  public async findByEmail(email: string, options?: IUserFindOptions): Promise<IUser> {
    return this.userRepository.findByEmail(email, options);
  }

  public async verify({ email, password }: SignInDto): Promise<IUser> {
    const user = await this.findByEmail(email, { withPassword: true });

    if (!user) {
      throw new WrongEmailOrPasswordError();
    }

    if (!(await this.hashPasswordProvider.compare(password, user.password))) {
      throw new WrongEmailOrPasswordError();
    }

    return user;
  }
}

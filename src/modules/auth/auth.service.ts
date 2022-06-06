
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ISuccessResponse } from 'src/common/interfaces';
import { UserService } from '../user';
import { IUser } from '../user/interfaces';
import { UserNotExistError } from '../user/errors';

import {
  AccountActivationDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from './dto';
import { IAuthService } from './interfaces';
import { IJwtPayload, ITokenPair, JwtService } from '../jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Transactional()
  public async register(user: SignUpDto): Promise<IUser> {
    try {
      const _user = await this.userService.create(user);

      return _user;
    } catch (error) {
      throw error;
    }
  }

  public async login(user: SignInDto): Promise<IUser> {
    return this.userService.verify(user);
  }

  public async getUserFromToken({ id }: IJwtPayload): Promise<IUser> {
    try {
      return this.userService.findById(id);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  public async forgotPassword(
    email: ForgotPasswordDto['email'],
  ): Promise<ISuccessResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UserNotExistError();
    }
    return { success: true };
  }

  @Transactional()
  public async resetPassword({
    token,
    password,
  }: ResetPasswordDto): Promise<IUser> {
    return this.userService.updatePassword('verificationId', password);
  }

  @Transactional()
  public async resendActivationLink(email: string): Promise<ISuccessResponse> {
    const user = await this.userService.findByEmail(email);

    return { success: true };
  }

  public getAuthTokens(payload: Partial<IJwtPayload>): ITokenPair {
    return this.jwtService.getTokenPair(payload);
  }
}

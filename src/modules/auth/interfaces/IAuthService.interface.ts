import { ISuccessResponse } from 'src/common/interfaces';
import { AccountActivationDto, ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from '../dto';
import { IJwtPayload } from '../../jwt/interfaces';
import { IUser } from 'src/modules/user/interfaces';

export interface IAuthService {
  getUserFromToken(payload: IJwtPayload): Promise<IUser>;
  forgotPassword(email: ForgotPasswordDto['email']): Promise<ISuccessResponse>;
  resetPassword(body: ResetPasswordDto): Promise<IUser>;
  register(user: SignUpDto): Promise<IUser>;
  login(user: SignInDto): Promise<IUser>;
  resendActivationLink(email: string): Promise<ISuccessResponse>;
}

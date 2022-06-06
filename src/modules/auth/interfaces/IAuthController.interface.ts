import { IRequestWithUser, ISuccessResponse } from 'src/common/interfaces';
import {
  AccountActivationDto,
  ActivatePhoneDto,
  ActivatePhoneRequestDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SignUpDto,
} from '../dto';
import { ITokenPair } from '../../jwt/interfaces';
import { ActivateEmailRequstDto } from '../dto/ActivateEmailRequst.dto';

export interface IAuthController {
  register(body: SignUpDto): Promise<ISuccessResponse>;

  login(req: IRequestWithUser): Promise<ITokenPair>;

  tokens(req: IRequestWithUser): Promise<ITokenPair>;

  forgotPassword(body: ForgotPasswordDto): Promise<ISuccessResponse>;

  resetPassword(body: ResetPasswordDto): Promise<ITokenPair>;

  sendActivationLink(body: ActivateEmailRequstDto): Promise<ISuccessResponse>;
}

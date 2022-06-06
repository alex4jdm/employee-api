import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PassportGuard } from 'src/common/guards';
import { IRequestWithUser, ISuccessResponse } from 'src/common/interfaces';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignUpDto,
} from './dto';
import { IAuthController } from './interfaces';
import { ITokenPair } from '../jwt';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import {
  ActivationResendSwagger,
  ForgotPasswordSwagger,
  LoginSwagger,
  RegisterSwagger,
  ResetPasswordSwagger,
  TokensSwagger,
} from './auth.swagger';
import { ActivateEmailRequstDto } from './dto/ActivateEmailRequst.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authorization and authentication')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @RegisterSwagger()
  @Post('register')
  @ApiExcludeEndpoint()
  async register(@Body() body: SignUpDto): Promise<ISuccessResponse> {
    await this.authService.register(body);

    return { success: true };
  }

  @LoginSwagger()
  @Post('login')
  @UseGuards(AuthGuard('local'))
  public async login(@Req() req: IRequestWithUser): Promise<ITokenPair> {
    const { id } = req.user;

    return this.authService.getAuthTokens({ id });
  }

  @ApiExcludeEndpoint()
  @TokensSwagger()
  @Get('tokens')
  @UseGuards(PassportGuard('jwt'))
  public async tokens(@Req() req: IRequestWithUser): Promise<ITokenPair> {
    const { id } = req.user;

    return this.authService.getAuthTokens({ id });
  }

  @ApiExcludeEndpoint()
  @ForgotPasswordSwagger()
  @Put('forgot-password')
  public async forgotPassword(
    @Body() { email }: ForgotPasswordDto,
  ): Promise<ISuccessResponse> {
    await this.authService.forgotPassword(email);

    return { success: true };
  }

  @ApiExcludeEndpoint()
  @ResetPasswordSwagger()
  @Put('reset-password')
  public async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<ITokenPair> {
    const { id } = await this.authService.resetPassword(body);

    return this.authService.getAuthTokens({ id });
  }

  @ApiExcludeEndpoint()
  @ActivationResendSwagger()
  @Post('activation/email/send')
  public async sendActivationLink(
    @Body() body: ActivateEmailRequstDto
  ): Promise<ISuccessResponse> {
    return this.authService.resendActivationLink(body.email);
  }

  @ApiBearerAuth()
  @Post('refresh')
  @UseGuards(PassportGuard('jwt-refresh'))
  public async refresh(
      @Req() req: IRequestWithUser,
  ): Promise<ITokenPair> {
    return this.authService.getAuthTokens({ id: req.user.id });
  }
}

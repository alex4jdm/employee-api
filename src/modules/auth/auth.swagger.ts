import { applyDecorators } from '@nestjs/common';
import { HTTP_STATUS } from 'src/common';

import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { SuccessResponseDto, TokenPairDto } from 'src/common/dto';
import { SignInDto, SignUpDto } from './dto';

export const LoginSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Login user via email and password' }),
    ApiBody({ type: SignInDto }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'JWT tokens for access to endpoints with bearer auth.',
      type: TokenPairDto,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST })
  );
};

export const TokensSwagger = (): any => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Renew tokens by refresh token' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'JWT tokens for access to endpoints with bearer auth.',
      type: TokenPairDto,
    }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED })
  );
};

export const ForgotPasswordSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Request an email for password recovery.' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      type: SuccessResponseDto,
    })
  );
};

export const ResetPasswordSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'User password recovery by token from email.' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'JWT tokens for access to endpoints with bearer auth.',
      type: TokenPairDto,
    })
  );
};

export const ActivateSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'User activation by code from email.' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'JWT tokens for access to endpoints with bearer auth.',
      type: TokenPairDto,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST })
  );
};

export const ActivationResendSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Re-ask the email with user activation.' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      type: SuccessResponseDto,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST })
  );
};

export const PhoneActivationSendSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Send activation code on phone' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      type: SuccessResponseDto,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST }),
  );
};


export const RegisterSwagger = (): any => {
  return applyDecorators(
    ApiOperation({ summary: 'Register user via email and password' }),
    ApiBody({ type: SignUpDto }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      type: SuccessResponseDto,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST })
  );
};
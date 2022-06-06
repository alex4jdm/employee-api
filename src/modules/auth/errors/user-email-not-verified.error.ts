import { ForbiddenException } from '@nestjs/common';

export class UserEmailNotVerifiedError extends ForbiddenException {
  constructor() {
    super({
      message: 'User email not verified'
    });
  }
}

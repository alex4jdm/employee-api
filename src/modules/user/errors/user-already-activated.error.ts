import { BadRequestException } from '@nestjs/common';

export class UserAlreadyActivatedError extends BadRequestException {
  constructor() {
    super({
      message: 'User already activated.'
    });
  }
}

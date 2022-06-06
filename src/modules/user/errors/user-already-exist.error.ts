import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistError extends ConflictException {
  constructor() {
    super({
      message: 'User already exist'
    });
  }
}

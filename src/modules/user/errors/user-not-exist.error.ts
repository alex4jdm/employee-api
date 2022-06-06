import { BadRequestException } from '@nestjs/common';

export class UserNotExistError extends BadRequestException {
  constructor() {
    super({ message: 'User not exist.' });
  }
}

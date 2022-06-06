import { BadRequestException } from '@nestjs/common';

export class WrongEmailOrPasswordError extends BadRequestException {
  constructor() {
    super({ message: 'Wrong email or password' });
  }
}

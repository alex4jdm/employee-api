import { BadRequestException } from '@nestjs/common';

export class FailedToDeleteUserError extends BadRequestException {
  constructor() {
    super({
      message: 'Failed to delete user'
    });
  }
}

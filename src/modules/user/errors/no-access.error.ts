import { BadRequestException } from '@nestjs/common';

export class FailedToUpdateUserAccessError extends BadRequestException {
  constructor() {
    super({
      message: 'No access to update this user'
    });
  }
}

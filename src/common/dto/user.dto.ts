import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({ type: String, description: 'User`s ID', format: 'uuid' })
  public id: string;
}

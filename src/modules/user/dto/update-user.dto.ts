import { ApiProperty } from '@nestjs/swagger';
import { UserIdDto } from 'src/common/dto/user.dto';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'user@email.com', type: String, description: 'User`s email address' })
  public readonly email?: string;

  @ApiProperty({ required: false, example: 'username', type: String, description: 'User`s username' })
  public readonly username?: string;

  @ApiProperty({ description: 'Boss object' })
  public readonly boss?: UserIdDto;
}

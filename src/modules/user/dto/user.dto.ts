import { ApiProperty } from '@nestjs/swagger';
import { UserIdDto } from 'src/common/dto/user.dto';


export class UserDto {
  @ApiProperty({ type: String, description: 'User`s ID', format: 'uuid' })
  public id: string;

  @ApiProperty({ example: 'user@email.com', type: String, description: 'User`s email address' })
  public email: string;

  @ApiProperty({ example: 'username', type: String, description: 'User`s username' })
  public username: string;

  @ApiProperty({ description: 'Boss object' })
  public boss: UserIdDto;

  @ApiProperty({ type: Date, description: 'User`s created date' })
  public createdAt: Date;

  @ApiProperty({ type: Date, description: 'User`s updated date' })
  public updatedAt: Date;
}

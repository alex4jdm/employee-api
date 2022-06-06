import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserIdDto } from 'src/common/dto/user.dto';

export class SignUpDto {
  @ApiProperty({ example: 'username@email.com', description: 'User`s email' })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: 'XaXukjhaADf123', description: 'User`s password' })
  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;

  @ApiProperty({ example: 'username', type: String, description: 'User`s username' })
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty({ description: 'Boss object' })
  @IsNotEmpty()
  public readonly boss: UserIdDto;
}

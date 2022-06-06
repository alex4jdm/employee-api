import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserIdDto } from 'src/common/dto/user.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', type: String, description: 'User`s email address' })
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({ example: 'username', type: String, description: 'User`s username' })
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty({ description: 'Boss object' })
  @IsNotEmpty()
  public readonly boss: UserIdDto;

  @ApiProperty({ example: 'XaXukjhaADf123', description: 'User`s password' })
  public readonly password: string;
}

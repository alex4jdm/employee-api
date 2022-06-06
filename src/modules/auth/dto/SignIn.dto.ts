import { IsDefined, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'user@email.com', description: 'User`s email address' })
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: 'XaXukjhaADf123', description: 'User`s password' })
  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;
}

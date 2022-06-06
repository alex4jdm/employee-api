import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@email.com', description: 'User`s email address' })
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;
}

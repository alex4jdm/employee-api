import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivateEmailRequstDto {
  @ApiProperty({
    example: 'user@email.com',
    type: String,
    description: 'User`s email address',
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

}

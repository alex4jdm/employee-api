import { IsDefined, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPasswordUpdateDto {
  @ApiProperty({ example: 'XaXukjhaADf123', description: 'User`s new password' })
  @IsNotEmpty()
  public readonly password: string;
}

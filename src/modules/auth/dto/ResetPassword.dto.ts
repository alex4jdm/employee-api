import { IsDefined, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'eyJhbGc...eyJpZCI6...ZlZWD--m...4Xew', description: 'Secret token from email link' })
  @IsNotEmpty()
  public readonly token: string;

  @ApiProperty({ example: 'XaXukjhaADf123', description: 'User`s password' })
  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;
}

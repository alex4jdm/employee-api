import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivatePhoneRequestDto {
  @ApiProperty({
    example: '88005553535',
    type: String,
    description: 'User`s phone',
  })
  @IsNotEmpty()
  @IsString()
  public phone: string;

}

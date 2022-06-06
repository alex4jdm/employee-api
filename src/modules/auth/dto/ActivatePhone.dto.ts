import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivatePhoneDto {
  @ApiProperty({
    example: '123456',
    description: 'Code from sms',
  })
  @IsNotEmpty()
  public readonly code: string;
}

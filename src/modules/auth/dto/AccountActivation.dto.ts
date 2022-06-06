import { IsDefined, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountActivationDto {
  @ApiProperty({
    example: '4554',
    description: 'Secret code from email',
  })
  @IsNotEmpty()
  public readonly code: string;
}

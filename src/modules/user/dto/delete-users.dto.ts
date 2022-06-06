import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUsersDto {
  @ApiProperty({ type: [String], description: 'Array of user ids' })
  @IsDefined()
  @IsString({ each: true })
  public readonly users: string[];
}

import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedQueryDto {
  @ApiProperty({ required: false, name: 'page', type: Number, description: 'Page number'})
  @Transform((offset) => parseInt(offset.value, 10))
  @IsNumber()
  @Min(0)
  public readonly page: number = DEFAULT_PAGE;

  @ApiProperty({ required: false, name: 'limit', type: Number, description: 'Page limit'})
  @Transform((limit) => parseInt(limit.value, 10))
  @IsNumber()
  @Min(0)
  public readonly limit: number = DEFAULT_LIMIT;
}

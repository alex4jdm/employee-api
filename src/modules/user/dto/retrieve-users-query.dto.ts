import { PaginatedQueryDto } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class RetrieveUsersQueryDto extends PaginatedQueryDto {
  @ApiProperty({ required: false, name: 'search', type: String, description: 'Search by user name and lastName' })
  @IsString()
  @IsOptional()
  public readonly search: string;

  @ApiProperty({ required: false, name: 'orderBy', type: String, description: 'Order users', example: 'createdAt,ASC' })
  @IsString()
  @IsOptional()
  public readonly orderBy: string;
}

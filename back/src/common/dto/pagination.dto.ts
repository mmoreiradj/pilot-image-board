import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toAscOrDesc, toNumber } from '../helper/cast.helper';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: 'The number of items to take',
    minimum: 1,
    default: 20,
  })
  @Transform(({ value }) => toNumber(value, { default: 20, min: 1 }))
  @IsOptional()
  limit = 20;

  @ApiProperty({
    description: 'The number of items to skip',
    minimum: 0,
    default: 0,
  })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsOptional()
  offset = 0;

  @ApiProperty({
    description: 'The order of the items',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @Transform(({ value }) => toAscOrDesc(value))
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
}

import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toAscOrDesc, toNumber } from '../helper/cast.helper';

export class PaginationDto {
  @Transform(({ value }) => toNumber(value, { default: 20, min: 1 }))
  @IsOptional()
  limit = 20;

  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsOptional()
  offset = 0;

  @Transform(({ value }) => toAscOrDesc(value))
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
}

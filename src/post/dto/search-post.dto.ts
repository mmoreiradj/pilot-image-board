import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toFieldOrDefault, toNumber } from '../../common/helper/cast.helper';

export class SearchPostDto extends PartialType(PaginationDto) {
  @IsOptional()
  description?: string;

  @Transform(({ value }) => toNumber(value) ?? undefined)
  @IsOptional()
  creatorId?: number;

  @Transform(({ value }) => Number(value) ?? undefined)
  @IsOptional()
  threadId?: number;

  @Transform(({ value }) =>
    toFieldOrDefault(
      value,
      ['id', 'description', 'threadId', 'creatorId', 'createdAt', 'updatedAt'],
      'createdAt',
    ),
  )
  @IsOptional()
  @IsString()
  orderBy: string;
}

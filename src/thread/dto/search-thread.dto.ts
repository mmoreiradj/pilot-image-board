import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toFieldOrDefault, toNumber } from '../../common/helper/cast.helper';

export class SearchThreadDto extends PartialType(PaginationDto) {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @Transform(({ value }) => toNumber(value) ?? null)
  @IsOptional()
  boardId: number;

  @Transform(({ value }) => toNumber(value) ?? null)
  @IsOptional()
  creatorId: number;

  @Transform(({ value }) =>
    toFieldOrDefault(
      value,
      [
        'id',
        'title',
        'description',
        'creatorId',
        'boardId',
        'createdAt',
        'updatedAt',
      ],
      'createdAt',
    ),
  )
  @IsOptional()
  @IsString()
  orderBy?: string;
}

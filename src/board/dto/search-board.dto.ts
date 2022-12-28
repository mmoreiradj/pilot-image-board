import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto';
import { Transform } from 'class-transformer';
import { toFieldOrDefault, toNumber } from '../../common/helper/cast.helper';

export class SearchBoardDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @Transform(({ value }) =>
    toFieldOrDefault(
      value,
      ['id', 'title', 'description', 'categoryId', 'createdAt', 'updatedAt'],
      'createdAt',
    ),
  )
  @IsOptional()
  @IsString()
  orderBy: string;
}

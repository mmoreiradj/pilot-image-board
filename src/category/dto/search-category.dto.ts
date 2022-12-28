import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto';
import { Transform } from 'class-transformer';
import { toFieldOrDefault } from '../../common/helper/cast.helper';

export class SearchCategoryDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) =>
    toFieldOrDefault(
      value,
      ['id', 'name', 'description', 'createdAt', 'updatedAt'],
      'createdAt',
    ),
  )
  @IsOptional()
  @IsString()
  orderBy: string;
}

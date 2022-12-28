import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toFieldOrDefault } from '../../common/helper/cast.helper';

export class SearchUserDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) =>
    toFieldOrDefault(
      value,
      ['id', 'username', 'createdAt', 'updatedAt'],
      'createdAt',
    ),
  )
  @IsOptional()
  @IsString()
  orderBy?: string;
}

import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto';
import { Transform } from 'class-transformer';
import { toFieldOrDefault } from '../../common/helper/cast.helper';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SearchCategoryDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'The name of the category',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the category',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The item column to order by',
    enum: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
    default: 'createdAt',
    required: false,
  })
  @ApiProperty()
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

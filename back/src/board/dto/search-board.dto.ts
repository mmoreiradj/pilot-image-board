import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto';
import { Transform } from 'class-transformer';
import { toFieldOrDefault, toNumber } from '../../common/helper/cast.helper';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SearchBoardDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'The name of the board',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The description of the board',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The id of the category the board belongs to',
    required: false,
    type: Number,
  })
  @ApiProperty()
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({
    description: 'The item column to order by',
    enum: [
      'id',
      'title',
      'description',
      'categoryId',
      'createdAt',
      'updatedAt',
    ],
    default: 'createdAt',
    required: false,
  })
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

import { PaginationDto } from '../../common/dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toFieldOrDefault, toNumber } from '../../common/helper/cast.helper';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SearchThreadDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'The title of the thread',
    required: false,
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The content of the thread',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The id of the board the thread belongs to',
    required: false,
    type: Number,
  })
  @Transform(({ value }) => toNumber(value) ?? null)
  @IsOptional()
  boardId: number;

  @ApiProperty({
    description: 'The id of the user who created the thread',
    required: false,
    type: Number,
  })
  @Transform(({ value }) => toNumber(value) ?? null)
  @IsOptional()
  creatorId: number;

  @ApiProperty({
    description: 'The item column to order by',
    enum: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
    default: 'createdAt',
    required: false,
  })
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

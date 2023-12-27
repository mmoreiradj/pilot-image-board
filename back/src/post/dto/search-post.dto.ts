import { PaginationDto } from '../../common/dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toFieldOrDefault, toNumber } from '../../common/helper/cast.helper';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SearchPostDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'The description of the post',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The creator of the post',
    required: false,
    type: Number,
  })
  @Transform(({ value }) => toNumber(value) ?? undefined)
  @IsOptional()
  creatorId?: number;

  @ApiProperty({
    description: 'The id of the thread the post belongs to',
    required: false,
    type: Number,
  })
  @ApiProperty()
  @Transform(({ value }) => Number(value) ?? undefined)
  @IsOptional()
  threadId?: number;

  @ApiProperty({
    description: 'The item column to order by',
    enum: [
      'id',
      'description',
      'creatorId',
      'threadId',
      'createdAt',
      'updatedAt',
    ],
    default: 'createdAt',
    required: false,
  })
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

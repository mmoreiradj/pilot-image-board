import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { toFieldOrDefault } from '../../common/helper/cast.helper';
import { ApiProperty } from "@nestjs/swagger";

export class SearchUserDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'The username of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The description of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The field to sort by',
    required: false,
  })
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

import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Culture',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  name?: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Culture discussion',
    required: false,
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}

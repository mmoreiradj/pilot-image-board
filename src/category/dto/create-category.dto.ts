import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Culture',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Culture discussion',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}

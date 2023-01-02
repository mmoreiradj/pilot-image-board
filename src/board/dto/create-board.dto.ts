import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    description: 'The name of the board',
    example: 'General',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  title: string;

  @ApiProperty({
    description: 'The description of the board',
    example: 'General discussion',
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    description: 'The id of the category the board belongs to',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  categoryId: number;
}

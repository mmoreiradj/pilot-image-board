import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThreadDto {
  @ApiProperty({
    description: 'The title of the thread',
    example: 'Hello everynyan!',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  title: string;

  @ApiProperty({
    description: 'The content of the thread',
    example: 'How are you ?',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    description: 'The id of the board the thread belongs to',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  boardId: number;
}

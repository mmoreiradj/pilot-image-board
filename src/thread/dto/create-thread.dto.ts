import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateThreadDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  boardId: number;
}

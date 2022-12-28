import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  categoryId: number;
}

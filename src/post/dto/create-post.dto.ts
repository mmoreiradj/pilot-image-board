import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  threadId: number;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

  @IsOptional()
  @IsString()
  image?: string;
}

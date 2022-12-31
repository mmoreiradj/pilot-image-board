import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}

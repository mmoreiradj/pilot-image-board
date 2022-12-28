import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateThreadDto {
  @IsOptional()
  @IsString()
  @MaxLength(25)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  description?: string;
}

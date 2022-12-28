import { IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MaxLength(255)
  description: string;
}

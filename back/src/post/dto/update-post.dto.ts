import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: 'The description of the post',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  description?: string;
}

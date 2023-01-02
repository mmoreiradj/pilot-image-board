import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateThreadDto {
  @ApiProperty({
    description: 'The title of the thread',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(25)
  title?: string;

  @ApiProperty({
    description: 'The content of the thread',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  description?: string;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TargetPost } from './target-post.dto';

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

  @ApiProperty({ type: [TargetPost] })
  @Type(() => TargetPost)
  @ValidateNested({ each: true })
  targetPostIds: TargetPost[];
}

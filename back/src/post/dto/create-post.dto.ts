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
  @ApiProperty({
    description: 'The content of the post',
    example: 'Hello world everynyan!',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  description: string;

  @ApiProperty({
    description: 'The id of the thread the post belongs to',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  threadId: number;

  @ApiProperty({
    description: 'The image of the post',
    example: 'cat-piture.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ type: [TargetPost] })
  @Type(() => TargetPost)
  @ValidateNested({ each: true })
  targetPostIds: TargetPost[];
}

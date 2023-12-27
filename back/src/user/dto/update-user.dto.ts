import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The description of the user',
  })
  @IsString()
  @MaxLength(255)
  description: string;
}

import { IsOptional, IsString, MaxLength, Validate } from 'class-validator';
import { NotNumber } from '../../common/validators/not-number.pipe';
import { NoSpaces } from '../../common/validators/no-spaces.pipe';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto {
  @ApiProperty({
    description: 'The name of the board',
    example: 'General',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Validate(NotNumber)
  @Validate(NoSpaces)
  @MaxLength(20)
  title?: string;

  @ApiProperty({
    description: 'The description of the board',
    example: 'General discussion',
    required: false,
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}

import { IsOptional, IsString, MaxLength, Validate } from 'class-validator';
import { NotNumber } from '../../common/validators/not-number.pipe';
import { NoSpaces } from '../../common/validators/no-spaces.pipe';

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  @Validate(NotNumber)
  @Validate(NoSpaces)
  @MaxLength(20)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}

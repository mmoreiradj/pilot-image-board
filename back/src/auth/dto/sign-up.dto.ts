import { IsString, Length, Validate } from 'class-validator';
import { IsPassword } from '../validator/is-password.pipe';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'lechatfou',
  })
  @IsString()
  @Length(1, 20)
  username: string;

  @ApiProperty({
    example: 'Chatonleboss123!',
  })
  @IsString()
  @Validate(IsPassword)
  @Length(12, 100)
  password: string;
}

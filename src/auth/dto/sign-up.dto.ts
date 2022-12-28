import { IsString, Length, Validate } from 'class-validator';
import { IsPassword } from '../validator/is-password.pipe';

export class SignUpDto {
  @IsString()
  @Length(1, 20)
  username: string;

  @IsString()
  @Validate(IsPassword)
  @Length(12, 100)
  password: string;
}

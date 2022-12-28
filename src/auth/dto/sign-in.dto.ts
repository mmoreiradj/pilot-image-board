import { IsOptional } from 'class-validator';

export class SignInDto {
  @IsOptional()
  username: string;

  @IsOptional()
  password: string;
}

import { IsNotEmpty, IsNumber } from 'class-validator';

export class TargetPost {
  @IsNotEmpty()
  @IsNumber()
  targetPostId: number;
}

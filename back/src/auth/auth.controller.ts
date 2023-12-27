import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The username is already taken or parameters are invalid',
  })
  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The token has been successfully refreshed',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The token is invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body('refresh_token') refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    return this.authService.refresh(refreshToken);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully signed in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The credentials are invalid',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}

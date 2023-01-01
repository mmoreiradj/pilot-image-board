import {
  Body, CacheInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { UserService } from './user.service';
import { SearchUserDto, UpdateUserDto } from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { AdminGuard, JwtGuard } from '../auth/guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() search: SearchUserDto) {
    return this.userService.findAll(search);
  }

  @UseGuards(JwtGuard)
  @Get('self')
  findSelf(@GetUser() user) {
    return this.findOne(user.sub);
  }

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch('self')
  updateSelf(@Body() dto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update(dto, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete('self')
  removeSelf(@GetUser() user: User) {
    return this.userService.remove(user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
